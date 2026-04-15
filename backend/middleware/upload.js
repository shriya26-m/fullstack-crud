const multer = require("multer");

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder
  },
  filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname);
},
});

const upload = multer({ storage });

module.exports = upload;