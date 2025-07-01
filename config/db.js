const mongoose = require('mongoose');
require('dotenv').config(); // needed to read .env

let connV = null;
let connS = null;

const connectV = () => {
    if (!connV) {
        connV = mongoose.createConnection(process.env.MONGO_URI_V, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connV.on('connected', () => {
            console.log('✅ Connected to MONGO_URI_V database');
        });
        connV.on('error', (err) => {
            console.error('❌ Error connecting to MONGO_URI_V:', err);
        });
    }
    return connV;
};

const connectS = () => {
    if (!connS) {
        connS = mongoose.createConnection(process.env.MONGO_URI_S, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connS.on('connected', () => {
            console.log('✅ Connected to MONGO_URI_S database');
        });
        connS.on('error', (err) => {
            console.error('❌ Error connecting to MONGO_URI_S:', err);
        });
    }
    return connS;
};

module.exports = { connectV, connectS };
