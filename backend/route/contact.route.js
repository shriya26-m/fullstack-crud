const express = require("express");
const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controller/contact.controller");

const router = express.Router();

router.post("/addcontact", addContact);
router.get("/contactlists", getContacts);
router.put("/update/:id", updateContact);
router.delete("/delete/:id", deleteContact);

module.exports = router;