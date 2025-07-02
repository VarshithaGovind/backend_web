const mongoose = require('mongoose');
const { connectV } = require('../config/db');
const conn = connectV();

const miniProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  languages: [String],
  guideSteps: [String],
  clubOnly: Boolean,
});

module.exports = conn.mongoose('MiniProject', miniProjectSchema);
