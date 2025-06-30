const mongoose = require('mongoose');

const MidProjectModel = new mongoose.Schema({
  title: String,
  image: String,
  languages: [String],
  guideSteps: [String],
  clubOnly: Boolean,
});

module.exports = mongoose.model("MidProject", MidProjectModel);