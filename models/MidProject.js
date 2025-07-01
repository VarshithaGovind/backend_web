const mongoose = require('mongoose');
const { connectS } = require('../config/db');
const conn = connectS();

const MidProjectModel = new mongoose.Schema({
  title: String,
  image: String,
  languages: [String],
  guideSteps: [String],
  clubOnly: Boolean,
});

module.exports = conn.model("MidProject", MidProjectModel);