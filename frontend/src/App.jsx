import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Climate from './pages/Climate';
import NationalMeasures from './pages/NationalMeasures';
import LocalMeasures from './pages/LocalMeasures';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import Config from './pages/Config';
import Tips from './pages/Tips';
import Prevention from './pages/Prevention';
import Emergency from './pages/Emergency';
import Surveys from './pages/Surveys';
import Maps from './pages/Maps';
import Login from './pages/Login';
import Register from './pages/Register';
import Feedback from './pages/Feedback';
import './styles/global.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/klimaat" element={<Climate />} />
              <Route path="/nationaal" element={<NationalMeasures />} />
              <Route path="/lokaal" element={<LocalMeasures />} />
              <Route path="/onderzoek" element={<Reports />} />
              <Route path="/rapport/:id" element={<ReportDetail />} />
              <Route 
                path="/config" 
                element={
                  <ProtectedRoute>
                    <Config />
                  </ProtectedRoute>
                } 
              />
              <Route path="/tips" element={<Tips />} />
              <Route path="/preventie" element={<Prevention />} />
              <Route path="/noodacties" element={<Emergency />} />
              <Route path="/enquetes" element={<Surveys />} />
              <Route path="/kaarten" element={<Maps />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
