const mongoose = require("mongoose")

const imagesModel = new mongoose.Schema({
  url: String,
  date: Date
});

module.exports = new mongoose.model("images", imagesModel);
