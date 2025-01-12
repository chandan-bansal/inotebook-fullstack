const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/inotebook`)
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection error', error);
  }
}


module.exports = connectDB;