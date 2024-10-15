const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

// MongoDB configuration
const mongoURI = 'mongodb://localhost:27017'; // Adjust your connection string if necessary
const dbName = 'db'; // Database name

// Initialize the app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'sample.html'));
});

// MongoDB connection
let db;
MongoClient.connect(mongoURI)
    .then(client => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Route to handle form submission for Insert
app.post('/insert', (req, res) => {
    const { ID, name, Age } = req.body;
    const newUser = { id: Number(ID), name, age: Number(Age) };

    db.collection('users').insertOne(newUser)
        .then(result => {
            console.log('Data inserted successfully');
            res.send('Data inserted successfully');
        })
        .catch(err => {
            console.error('Error inserting data', err);
            res.send('Error inserting data');
        });
});

// Route to handle form submission for Update
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
            res.send('Error updating data');
        });
});

// Route to handle form submission for Delete
app.post('/delete', (req, res) => {
    const { ID } = req.body;

    db.collection('users').deleteOne({ id: Number(ID) })
        .then(result => {
            console.log('Data deleted successfully', result);
            res.send('Data deleted successfully');
        })
        .catch(err => {
            console.error('Error deleting data', err);
            res.send('Error deleting data');
        });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
