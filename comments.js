// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create web server
const app = express();
// Enable CORS
app.use(cors());
// Enable parsing of posted data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create database connection
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbrestapi'
});

// Connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to REST API');
});

// Get all comments
app.get('/api/comments', (req, res) => {
  let sql = 'SELECT * FROM comments';
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get single comment
app.get('/api/comments/:id', (req, res) => {
  let sql = `SELECT * FROM comments WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Create comment
app.post('/api/comments', (req, res) => {
  let data = { name: req.body.name, comment: req.body.comment };
  let sql = 'INSERT INTO comments SET ?';
  let query = db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Update comment
app.put('/api/comments/:id', (req, res) => {
  let sql = `UPDATE comments SET name = '${req.body.name}', comment = '${req.body.comment}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Delete comment
app.delete('/api/comments/:id', (req, res) => {
  let sql = `DELETE FROM comments WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if