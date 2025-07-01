const mongoose = require('mongoose');
const { connectV } = require('../config/db');
const conn = connectV();

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
});

module.exports = conn.model('Booking', bookingSchema);
