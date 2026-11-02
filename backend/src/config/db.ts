import mongoose from 'mongoose';

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('MongoDB connected');
};

export default connectDB;