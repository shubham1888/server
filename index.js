const express = require('express');
const bodyParser = require('body-parser');
const PouchDB = require('pouchdb');

const app = express();
const db = new PouchDB('mydb');

app.use(bodyParser.json());

// Create a new document
app.post('/api/documents', async (req, res) => {
    try {
        const result = await db.post(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a document by ID
app.get('/api/documents/:id', async (req, res) => {
    try {
        const result = await db.get(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Update a document by ID
app.put('/api/documents/:id', async (req, res) => {
    try {
        const doc = await db.get(req.params.id);
        const updatedDoc = Object.assign({}, doc, req.body);
        const result = await db.put(updatedDoc);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a document by ID
app.delete('/api/documents/:id', async (req, res) => {
    try {
        const doc = await db.get(req.params.id);
        const result = await db.remove(doc);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
