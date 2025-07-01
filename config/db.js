const mongoose = require('mongoose');
require('dotenv').config(); // needed to read .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_S, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB Atlas (Srinivas)');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
