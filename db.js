const PouchDB = require('pouchdb');

const db = new PouchDB('dailylogs');

// Create a new document
const createDocument = async (doc) => {
    try {
        const result = await db.post(doc);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get a document by ID
const getDocumentById = async (id) => {
    try {
        const result = await db.get(id);
        return result;
    } catch (error) {
        console.log(error)
        return []
    }
};

// Update a document by ID
const updateDocumentById = async (id, doc) => {
    try {
        const existingDoc = await db.get(id);
        const updatedDoc = Object.assign({}, existingDoc, doc);
        const result = await db.put(updatedDoc);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete a document by ID
const deleteDocumentById = async (id) => {
    try {
        const doc = await db.get(id);
        const result = await db.remove(doc);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all documents
const getAllDocuments = async () => {
    try {
        const result = await db.allDocs({ include_docs: true });
        return result.rows.map(row => row.doc);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete all documents
const deleteAllDocuments = async () => {
    try {
        const docs = await db.allDocs({ include_docs: true });
        const result = await Promise.all(docs.rows.map(row => db.remove(row.doc)));
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createDocument,
    getDocumentById,
    updateDocumentById,
    deleteDocumentById,
    getAllDocuments,
    deleteAllDocuments,
};
