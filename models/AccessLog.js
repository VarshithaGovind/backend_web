const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
  projectId: mongoose.Schema.Types.ObjectId,
  projectType: String,
  accessedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AccessLog', accessLogSchema);
