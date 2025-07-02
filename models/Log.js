const mongoose = require('mongoose');
const { connectV } = require('../config/db');
const conn = connectV();

const logSchema = new mongoose.Schema({
  message: String,
  level: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = conn.model('Log', logSchema);
