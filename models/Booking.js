const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'MajorProject' },
    projectTitle: String,
    userEmail: String,
    status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
