const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to database!, ")
    } catch (err) {
        console.log("Error connecting with database", err)
    }

}

module.exports = connectDB