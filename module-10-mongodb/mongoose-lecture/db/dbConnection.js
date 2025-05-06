import mongoose from 'mongoose';

try {
  //Connect to the MongoDB Database
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Database connected successfully');
} catch (error) {
  console.log('Database connection failed: ', error);
}
