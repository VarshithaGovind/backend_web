const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AccessLog', accessLogSchema);
