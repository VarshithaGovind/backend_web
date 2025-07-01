const mongoose = require('mongoose');
const { connectS } = require('../config/db');
const conn = connectS();

const logSchema = new mongoose.Schema({
  message: String,
  level: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = conn.model('Log', logSchema);
