const mongoose = require('mongoose');
const { connectS } = require('../config/db');
const conn = connectS();

const accessLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = conn.model('AccessLog', accessLogSchema);
