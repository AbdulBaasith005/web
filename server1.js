const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

// Database configuration
const dbconfig = {
    host: 'localhost',
    user: 'root',
    password: '2005',
    database: 'db'
};

const con = mysql.createConnection(dbconfig);

// Connect to the database
con.connect((err) => {
    if (err) {
        console.log('Error connecting to the database');
        return;
    }
    console.log('Connected to the database successfully');
});

// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission for Insert
app.post('/insert', (req, res) => {
    const { ID, name, Age } = req.body;
    const query = 'INSERT INTO users(id, name, age) VALUES (?, ?, ?)';
    con.query(query, [ID, name, Age], (err, result) => {
        if (err) {
            console.log('Error inserting data');
            res.send('Error inserting data');
            return;
        }
        console.log('Data inserted successfully');
        res.send('Data inserted successfully');
    });
});

// Route to handle form submission for Update
app.post('/update', (req, res) => {
    const { ID, name } = req.body;
    const query = 'UPDATE users SET name = ? WHERE id = ?';
    con.query(query, [name, ID], (err, result) => {
        if (err) {
            console.log('Error updating data');
            res.send('Error updating data');
            return;
        }
        console.log('Data updated successfully');
        res.send('Data updated successfully');
    });
});

// Route to handle form submission for Delete
app.post('/delete', (req, res) => {
    const { ID } = req.body;
    const query = 'DELETE FROM users WHERE id = ?';
    con.query(query, [ID], (err, result) => {
        if (err) {
            console.log('Error deleting data');
            res.send('Error deleting data');
            return;
        }
        console.log('Data deleted successfully');
        res.send('Data deleted successfully');
    });
});

// Route to display all users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    con.query(query, (err, results) => {
        if (err) {
            console.log('Error fetching data');
            res.send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'sample.html'));
});
