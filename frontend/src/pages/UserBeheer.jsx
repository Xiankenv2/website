import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserBeheer = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const styles = {
    container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
    panel: {
      background: "#f8f8f8",
      padding: "1.5rem",
      borderRadius: "8px",
      border: "1px solid #ddd",
    },
    label: { fontWeight: 600 },
    input: {
      width: "100%",
      padding: "0.6rem",
      marginBottom: "0.5rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    btn: {
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: 600,
      marginRight: "0.5rem",
    },
    primary: { background: "#0077ff", color: "#fff" },
    danger: { background: "#d9534f", color: "#fff" },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "1rem",
    },
    th: {
      borderBottom: "2px solid #ccc",
      padding: "0.5rem",
      textAlign: "left",
      background: "#eee",
    },
    td: {
      padding: "0.5rem",
      borderBottom: "1px solid #ddd",
    },
  };

  // -----------------------------------------------------
  // Load all users
  // -----------------------------------------------------
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Kon gebruikers niet laden");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadUsers();
  }, []);

  // -----------------------------------------------------
  // Update role
  // -----------------------------------------------------
  const updateRole = async (id, newRole) => {
    try {
      setError(null);
      setSuccess(null);

      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Rol kon niet worden aangepast");

      setUsers((p) =>
        p.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      setSuccess("Rol aangepast!");
    } catch (err) {
      setError(err.message);
    }
  };

  // -----------------------------------------------------
  // Update password
  // -----------------------------------------------------
  const updatePassword = async (id, newPassword) => {
    try {
      setError(null);
      setSuccess(null);

      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/users/${id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!res.ok) throw new Error("Wachtwoord kon niet worden aangepast");

      setUsers((p) =>
        p.map((u) => (u.id === id ? { ...u, password: newPassword } : u))
      );

      setSuccess("Wachtwoord aangepast!");
    } catch (err) {
      setError(err.message);
    }
  };

  // -----------------------------------------------------
  // Delete user
  // -----------------------------------------------------
  const deleteUser = async (id) => {
    if (!window.confirm("Weet je zeker dat je deze gebruiker wilt verwijderen?"))
      return;

    try {
      setError(null);
      setSuccess(null);

      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Gebruiker kon niet worden verwijderd");

      setUsers((p) => p.filter((u) => u.id !== id));
      setSuccess("Gebruiker verwijderd!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user || user.role !== "admin")
    return <div style={{ padding: "2rem" }}>Geen toegang</div>;

  return (
    <div style={styles.container}>
      <h1>Beheer gebruikers</h1>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}
      {success && (
        <div style={{ color: "green", marginBottom: "1rem" }}>{success}</div>
      )}

      <div style={styles.panel}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Gebruikersnaam</th>
              <th style={styles.th}>Wachtwoord</th>
              <th style={styles.th}>Rol</th>
              <th style={styles.th}>Acties</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={styles.td}>{u.id}</td>
                <td style={styles.td}>{u.username}</td>

                {/* Wachtwoord kan gewijzigd worden */}
                <td style={styles.td}>
                  <input
                    style={styles.input}
                    defaultValue={u.password}
                    onBlur={(e) => updatePassword(u.id, e.target.value)}
                  />
                </td>

                {/* Rol wijzigen */}
                <td style={styles.td}>
                  <select
                    value={u.role}
                    onChange={(e) => updateRole(u.id, e.target.value)}
                    style={styles.input}
                  >
                    <option value="guest">guest</option>
                    <option value="researcher">researcher</option>
                    <option value="admin">admin</option>
                  </select>
                </td>

                <td style={styles.td}>
                  <button
                    style={{ ...styles.btn, ...styles.danger }}
                    onClick={() => deleteUser(u.id)}
                  >
                    Verwijderen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBeheer;
