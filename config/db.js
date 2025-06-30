const mongoose = require('mongoose');
require('dotenv').config(); // needed to read .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Database connected');
    } catch (err) {
        console.error('❌ Database connection failed');
        process.exit(1);
    }
};

module.exports = connectDB;
