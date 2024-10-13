// index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

// Set up SQLite database
const db = new sqlite3.Database(':memory:'); // Using in-memory DB for simplicity. You can use a file by providing a path.

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, task TEXT, completed INTEGER)');
});

// Get all to-dos
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ todos: rows });
  });
});

// Add a new to-do
app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task cannot be empty' });
  }
  const stmt = db.prepare('INSERT INTO todos (task, completed) VALUES (?, 0)');
  stmt.run(task, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, task, completed: 0 });
  });
  stmt.finalize();
});

// Delete a to-do
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM todos WHERE id = ?', id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deletedId: id });
  });
});

// Mark a to-do as completed
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.run('UPDATE todos SET completed = ? WHERE id = ?', [completed ? 1 : 0, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ updatedId: id });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
