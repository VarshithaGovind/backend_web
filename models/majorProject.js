const mongoose = require('mongoose');
const { connectS } = require('../config/db');
const conn = connectS();


const majorProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  languages: [String],
  guideSteps: [String],
  clubOnly: Boolean,
});

module.exports = conn.model('MajorProject', majorProjectSchema);
