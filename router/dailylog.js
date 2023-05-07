const express = require("express");
const router = express.Router();

const { createDocumentFunc, getAllDocumentsFunc, deleteAllDocumentsFunc, getDocumentByIdFunc, deleteDocumentByIdFunc, updateDocumentByIdFunc } = require("../controller/dailylog");

// router.route("/").get();
router.route("/create").post(createDocumentFunc);
router.route("/get/:_id").get(getDocumentByIdFunc);
router.route("/get").get(getAllDocumentsFunc);
router.route("/del").delete(deleteAllDocumentsFunc);
router.route("/del/:_id").delete(deleteDocumentByIdFunc);
router.route("/update/:_id").patch(updateDocumentByIdFunc);

module.exports = router;