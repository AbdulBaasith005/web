const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

// MongoDB configuration
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'db';

// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON bodies

// Serve the AngularJS app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MongoDB connection
let db;
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Insert user route
app.post('/insert', (req, res) => {
    const newUser = { id: Number(req.body.ID), name: req.body.name, age: Number(req.body.Age) };
    
    db.collection('users').insertOne(newUser)
        .then(result => {
            console.log('Data inserted successfully');
            res.send('Data inserted successfully');
        })
        .catch(err => {
            console.error('Error inserting data', err);
            res.status(500).send('Error inserting data');
        });
});

// Update user route
app.post('/update', (req, res) => {
    const { ID, name } = req.body;

    db.collection('users').updateOne(
        { id: Number(ID) },
        { $set: { name } }
    )
        .then(result => {
            console.log('Data updated successfully', result);
            res.send('Data updated successfully');
        })
        .catch(err => {
            console.error('Error updating data', err);
            res.status(500).send('Error updating data');
        });
});

// Delete user route
app.post('/delete', (req, res) => {
    const { ID } = req.body;

    db.collection('users').deleteOne({ id: Number(ID) })
        .then(result => {
            console.log('Data deleted successfully', result);
            res.send('Data deleted successfully');
        })
        .catch(err => {
            console.error('Error deleting data', err);
            res.status(500).send('Error deleting data');
        });
});

// Fetch all users route
app.get('/users', (req, res) => {
    db.collection('users').find({}).toArray()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.error('Error fetching users', err);
            res.status(500).send('Error fetching users');
        });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
