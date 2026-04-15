const express = require("express");
const router = express.Router();

const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controller/contact.controller");

const upload = require("../middleware/upload");

// ✅ CREATE (FIXED ROUTE NAME + multer)
router.post("/add", upload.single("image"), addContact);

// ✅ READ
router.get("/contactlists", getContacts);

// ✅ UPDATE
router.put("/update/:id", upload.single("image"), updateContact);

// ✅ DELETE
router.delete("/delete/:id", deleteContact);

module.exports = router;