const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database");
const contactRouter = require("./route/contact.route");

const app = express();

databaseConnection();

app.use(cors());
app.use(express.json());


app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.use("/contact", contactRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});