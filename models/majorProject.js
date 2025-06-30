const mongoose = require('mongoose')

const MajorSchema = new mongoose.Schema({ 
    title: { type: String, required: true },
    description: { type: String },
    isFree: { type: Boolean, default: false }
})

module.exports = mongoose.model('Major', MajorSchema);
