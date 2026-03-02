const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

// In-memory users array
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Manager' },
];

let nextId = 4;

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST add new user
app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newUser = { id: nextId++, name, email, role };
  users.push(newUser);

  res.status(201).json({ message: 'User added successfully!', user: newUser });
});

// DELETE user by id
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);
  res.json({ message: 'User deleted successfully!' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});