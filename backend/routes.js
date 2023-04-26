
const express = require('express')
const router = express.Router()
const pool = require('./db')
const authenticateToken = require('./auth/authToken');


router.get('/', (req, res) => {

  pool.query('SELECT * FROM students')
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server error');
    });
});

// Get a specific student
router.get('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM students WHERE id = ?', [id])
    .then(result => {
      if (result.length === 0) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).json(result[0]);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server error');
    });
});

// Create a new student
router.post('/', authenticateToken, (req, res) => {
  const { name, email, course } = req.body;
  pool.query('INSERT INTO students (name, email, course) VALUES (?, ?, ?)', [name, email, course])
    .then(result => {
      res.status(201).send(`Student added with ID: ${result.insertId}`);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server error');
    });
});

// Update an existing student
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;
  pool.query('UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?', [name, email, course, id])
    .then(result => {
      if (result.affectedRows === 0) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).send(`Student updated with ID: ${id}`);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server error');
    });
});

// Delete a student
router.delete('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM students WHERE id = ?', [id])
    .then(result => {
      if (result.affectedRows === 0) {
        res.status(404).send('Student not found');
      } else {
        res.status(200).send(`Student deleted with ID: ${id}`);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server error');
    });
});
module.exports = router;