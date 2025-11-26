const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'waterveiligheid_secret_key_123'; // In production, use environment variable

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Static file serving for uploads
app.use('/uploads', express.static(uploadDir));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Helper function to read JSON files
const readData = (filename) => {
    const filePath = path.join(__dirname, '../database', filename);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading ${filename}:`, err);
        return null;
    }
};

// Helper function to write JSON files
const writeData = (filename, data) => {
    const filePath = path.join(__dirname, '../database', filename);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error(`Error writing ${filename}:`, err);
        return false;
    }
};

// Middleware: Verify Token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });
        req.user = decoded;
        next();
    });
};

// Middleware: Verify Role
const verifyRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};

// --- LOGGING SETUP ---
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logAction = (action, details) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [ACTION] ${action}: ${JSON.stringify(details)}\n`;
    fs.appendFileSync(path.join(logDir, 'app.log'), logMessage);
};

const logError = (error, context) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [ERROR] ${context}: ${error}\n`;
    fs.appendFileSync(path.join(logDir, 'error.log'), logMessage);
    console.error(`[ERROR] ${context}:`, error);
};

// --- AUTH ENDPOINTS ---

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    try {
        const users = readData('users.json');
        const user = users.find(u => u.username === username);

        if (!user) {
            logAction('LOGIN_FAILED', { username, reason: 'User not found' });
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            logAction('LOGIN_FAILED', { username, reason: 'Invalid password' });
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, {
            expiresIn: 300 // 5 minutes
        });

        logAction('LOGIN_SUCCESS', { username, role: user.role });
        res.json({
            id: user.id,
            username: user.username,
            role: user.role,
            accessToken: token
        });
    } catch (err) {
        logError(err.message, 'LOGIN_ENDPOINT');
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout endpoint (client clears token)
app.post('/api/logout', (req, res) => {
  // No server-side session to destroy; just respond
  res.json({ success: true, message: 'Logged out' });
});

app.post('/api/register', (req, res) => {
    const { username, password, department } = req.body;
    try {
        const users = readData('users.json');

        if (users.find(u => u.username === username)) {
            logAction('REGISTER_FAILED', { username, reason: 'Username exists' });
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            username,
            password: hashedPassword,
            role: 'guest', // Default role is now guest
            department: department || 'General'
        };

        users.push(newUser);
        if (writeData('users.json', users)) {
            logAction('REGISTER_SUCCESS', { username, role: 'guest' });
            res.json({ success: true, message: 'User registered successfully' });
        } else {
            throw new Error('Failed to write users.json');
        }
    } catch (err) {
        logError(err.message, 'REGISTER_ENDPOINT');
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// --- USER MANAGEMENT ENDPOINTS (ADMIN ONLY) ---

app.get('/api/users', verifyToken, verifyRole(['admin']), (req, res) => {
    const users = readData('users.json');
    // Return users WITH passwords (admin requested this for display)
    res.json(users);
});

app.put('/api/users/:id', verifyToken, verifyRole(['admin']), (req, res) => {
    const { id } = req.params;
    const { role, password } = req.body;
    const users = readData('users.json');
    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

    if (role) users[userIndex].role = role;
    if (password) users[userIndex].password = bcrypt.hashSync(password, 10);

    if (writeData('users.json', users)) {
        logAction('USER_UPDATED', { admin: req.user.username, targetId: id, updates: { role, passwordChanged: !!password } });
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

app.delete('/api/users/:id', verifyToken, verifyRole(['admin']), (req, res) => {
    const { id } = req.params;
    let users = readData('users.json');
    const initialLength = users.length;
    users = users.filter(u => u.id !== parseInt(id));

    if (users.length === initialLength) return res.status(404).json({ error: 'User not found' });

    if (writeData('users.json', users)) {
        logAction('USER_DELETED', { admin: req.user.username, targetId: id });
        res.json({ success: true });
    } else {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// --- FEEDBACK ENDPOINTS ---

app.get('/api/feedback', (req, res) => {
    const data = readData('feedback.json');
    res.json(data || []);
});

app.post('/api/feedback', (req, res) => {
    try {
        const feedbackList = readData('feedback.json') || [];
        const newFeedback = {
            id: feedbackList.length > 0 ? Math.max(...feedbackList.map(f => f.id)) + 1 : 1,
            ...req.body,
            date: new Date().toISOString()
        };
        feedbackList.push(newFeedback);
        
        if (writeData('feedback.json', feedbackList)) {
            logAction('FEEDBACK_SUBMITTED', { type: req.body.type });
            res.json(newFeedback);
        } else {
            throw new Error('Failed to write feedback.json');
        }
    } catch (err) {
        logError(err.message, 'FEEDBACK_SUBMIT');
        res.status(500).json({ error: 'Failed to save feedback' });
    }
});

// --- SURVEY ENDPOINT ---
app.post('/api/surveys', (req, res) => {
    try {
        const surveys = readData('surveys.json') || [];
        const newSurvey = {
            id: surveys.length > 0 ? Math.max(...surveys.map(s => s.id)) + 1 : 1,
            ...req.body
        };
        surveys.push(newSurvey);
        if (writeData('surveys.json', surveys)) {
            logAction('SURVEY_SUBMITTED', { id: newSurvey.id });
            res.json({ success: true });
        } else {
            throw new Error('Failed to write surveys.json');
        }
    } catch (err) {
        logError(err.message, 'SURVEY_SUBMIT');
        res.status(500).json({ error: 'Failed to save survey' });
    }
});

// --- UPLOAD ENDPOINT ---

app.post('/api/upload', verifyToken, upload.array('files'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }
    const fileInfos = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: `/uploads/${file.filename}`,
        mimetype: file.mimetype,
        size: file.size
    }));
    res.json({ files: fileInfos });
});

// --- DATA ENDPOINTS ---

app.get('/api/climate', (req, res) => {
    const data = readData('climate.json');
    res.json(data);
});

app.get('/api/risks', (req, res) => {
    const data = readData('risks.json');
    res.json(data);
});

app.get('/api/national-measures', (req, res) => {
    const data = readData('national_measures.json');
    res.json(data);
});

app.get('/api/local-measures', (req, res) => {
    const data = readData('local_measures.json');
    res.json(data);
});

app.get('/api/reports', (req, res) => {
    const data = readData('reports.json');
    res.json(data);
});

app.get('/api/reports/:id', (req, res) => {
    const data = readData('reports.json');
    const report = data.find(r => r.id === parseInt(req.params.id));
    if (report) {
        res.json(report);
    } else {
        res.status(404).json({ error: 'Report not found' });
    }
});

// Add new report (Protected: Admin & Researcher)
app.post('/api/reports', verifyToken, verifyRole(['admin', 'researcher']), (req, res) => {
    const reports = readData('reports.json');
    const newReport = {
        id: reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1,
        ...req.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: req.user.username
    };
    reports.push(newReport);
    if (writeData('reports.json', reports)) {
        res.json(newReport);
    } else {
        res.status(500).json({ error: 'Failed to save report' });
    }
});

// Update report (Protected: Admin & Researcher)
app.put('/api/reports/:id', verifyToken, verifyRole(['admin', 'researcher']), (req, res) => {
    const reports = readData('reports.json');
    const index = reports.findIndex(r => r.id === parseInt(req.params.id));
    if (index !== -1) {
        reports[index] = { 
            ...reports[index], 
            ...req.body, 
            id: parseInt(req.params.id),
            updatedAt: new Date().toISOString()
        };
        if (writeData('reports.json', reports)) {
            res.json(reports[index]);
        } else {
            res.status(500).json({ error: 'Failed to update report' });
        }
    } else {
        res.status(404).json({ error: 'Report not found' });
    }
});

// Delete report (Protected: Admin ONLY)
app.delete('/api/reports/:id', verifyToken, verifyRole(['admin']), (req, res) => {
    const reports = readData('reports.json');
    const filtered = reports.filter(r => r.id !== parseInt(req.params.id));
    if (filtered.length < reports.length) {
        if (writeData('reports.json', filtered)) {
            res.json({ success: true });
        } else {
            res.status(500).json({ error: 'Failed to delete report' });
        }
    } else {
        res.status(404).json({ error: 'Report not found' });
    }
});

app.get('/api/tips', (req, res) => {
    const data = readData('tips.json');
    res.json(data);
});

app.get('/api/surveys', (req, res) => {
    const data = readData('surveys.json');
    res.json(data);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
