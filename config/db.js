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
    }
    return connV;
};

const connectS = () => {
    if (!connS) {
        connS = mongoose.createConnection(process.env.MONGO_URI_S, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return connS;
};

module.exports = { connectV, connectS };
