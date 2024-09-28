const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017";

async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection error', error);
  }
}


module.exports = connectDB;