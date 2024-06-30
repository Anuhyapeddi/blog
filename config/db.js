const mongoose = require('mongoose')
const uri = process.env.MONGO_URL;

async function connectToMongoDB() {
    try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
    }
  }

connectToMongoDB();