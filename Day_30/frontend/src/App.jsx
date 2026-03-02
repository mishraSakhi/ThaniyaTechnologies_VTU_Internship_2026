import { useState, useEffect } from "react";

const API = "http://localhost:5000/api/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const fetchUsers = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  };
  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

 
  // Add new user
  const addUser = async () => {
    if (!name || !email || !role) {
      setMessage("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), role: role.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Failed to add user.");
        return;
      }

      setMessage(data.message); // "User added successfully!"
      setName("");
      setEmail("");
      setRole("");
      fetchUsers(); // Refresh list
    } catch (err) {
      console.error("Error adding user:", err);
      setMessage("Cannot connect to backend. Make sure server is running on http://localhost:5000");
    }
  };

  // Delete user
  const deleteUser = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message); // "User deleted successfully!"
        fetchUsers(); // Refresh list
      })
      .catch((err) => console.error("Error deleting user:", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>👥 User Management System</h1>
      <p>Learn Full-Stack Development with React & Express</p>

      <hr />

      {/* Add User Form */}
      <h2>➕ Add New User</h2>
      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />
      <input
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />
      <input
        placeholder="Role (e.g., Developer)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />
      <button
        onClick={addUser}
        style={{ padding: "8px 16px", background: "#1a56db", color: "white", border: "none", cursor: "pointer" }}
      >
        Add User
      </button>

      {/* Success / Error Message */}
      {message && (
        <p style={{ color: message.includes("successfully") ? "green" : "red", fontWeight: "bold" }}>
          {message}
        </p>
      )}

      <hr />

      {/* User List */}
      <h2>📋 User List ({users.length})</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                width: "220px",
                background: "#f9f9f9",
              }}
            >
              <h3 style={{ margin: "0 0 8px" }}>{user.name}</h3>
              <p style={{ margin: "4px 0" }}>📧 {user.email}</p>
              <p style={{ margin: "4px 0" }}>💼 {user.role}</p>
              <button
                onClick={() => deleteUser(user.id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  background: "#e02424",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  borderRadius: "4px",
                }}
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
