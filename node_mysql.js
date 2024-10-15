const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

// MySQL configuration
const dbconfig = {
    host: 'localhost',
    user: 'root',
    password: '2005',
    database: 'db'
};

// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create MySQL connection
const con = mysql.createConnection(dbconfig);

// Connect to MySQL
con.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Insert user route
app.post('/insert', (req, res) => {
    const newUser = { id: req.body.ID, name: req.body.name, age: req.body.Age };

    const query = 'INSERT INTO users (id, name, age) VALUES (?, ?, ?)';
    con.query(query, [newUser.id, newUser.name, newUser.age], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        console.log('Data inserted successfully');
        res.send('Data inserted successfully');
    });
});

// Update user route
app.post('/update', (req, res) => {
    const { ID, name } = req.body;

    const query = 'UPDATE users SET name = ? WHERE id = ?';
    con.query(query, [name, ID], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).send('Error updating data');
            return;
        }
        console.log('Data updated successfully');
        res.send('Data updated successfully');
    });
});

// Delete user route
app.post('/delete', (req, res) => {
    const { ID } = req.body;

    const query = 'DELETE FROM users WHERE id = ?';
    con.query(query, [ID], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).send('Error deleting data');
            return;
        }
        console.log('Data deleted successfully');
        res.send('Data deleted successfully');
    });
});

// Fetch all users route
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    con.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
