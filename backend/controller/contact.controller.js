const { Contact } = require("../model/contact.model");

// CREATE
const addContact = async (req, res) => {
  try {
    const { FirstName, LastName, Relation, PhoneNum } = req.body;

    if (!FirstName || !LastName || !Relation || !PhoneNum) {
      return res.status(400).json({
        Success: false,
        Message: "All fields required",
      });
    }
const newContact = await Contact.create({
  FirstName,
  LastName,
  Relation,
  PhoneNum,
  Image: req.file ? req.file.filename : null, 
});

    res.status(201).json({
      Success: true,
      Message: "Contact added",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ Success: false, Message: error.message });
  }
};

// READ
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json({
      Success: true,
      ContactList: contacts,
    });
  } catch (error) {
    res.status(500).json({ Success: false, Message: error.message });
  }
};

// UPDATE
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

  const updateData = {
  FirstName: req.body.FirstName,
  LastName: req.body.LastName,
  Relation: req.body.Relation,
  PhoneNum: req.body.PhoneNum,
};

if (req.file) {
  updateData.Image = req.file.filename; 
}

const updated = await Contact.findByIdAndUpdate(id, updateData, {
  new: true,
});
    res.status(200).json({
      Success: true,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ Success: false, Message: error.message });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    await Contact.findByIdAndDelete(id);

    res.status(200).json({
      Success: true,
      Message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ Success: false, Message: error.message });
  }
};

module.exports = {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
};