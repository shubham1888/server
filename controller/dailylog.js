const db = require("../db")

const createDocumentFunc = async (req, res) => {
    let dbdata = await db.getAllDocuments()
    const idSet = new Set(dbdata.map(item => item._id))
    let reqdata = req.body
    reqdata.map((i) => {
        if (idSet.has(i._id)) {

        } else {
            db.createDocument(i)
        }
    })
    res.send("Data stored");
}

const getAllDocumentsFunc = async (req, res) => {
    let dbdata = await db.getAllDocuments()
    res.send(dbdata)
}

const getDocumentByIdFunc = async (req, res) => {
    const userId = req.params._id;
    let dbdata = await db.getDocumentById(userId)
    res.send(dbdata)
}

const deleteAllDocumentsFunc = async (req, res) => {
    let dbdata = await db.deleteAllDocuments()
    res.send(dbdata)
}

const deleteDocumentByIdFunc = async (req, res) => {
    const userId = req.params._id;
    let dbdata = await db.deleteDocumentById(userId)
    res.send(dbdata)
}

const updateDocumentByIdFunc = async (req, res) => {
    const userId = req.params._id;
    let dbdata = await db.updateDocumentById(userId, req.body)
    res.send(dbdata)
}


module.exports = {
    createDocumentFunc,
    getAllDocumentsFunc,
    deleteAllDocumentsFunc,
    getDocumentByIdFunc,
    deleteDocumentByIdFunc,
    updateDocumentByIdFunc
}
