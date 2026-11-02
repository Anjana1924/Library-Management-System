import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User';

(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  const email = (process.env.ADMIN_EMAIL as string).toLowerCase();
  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Admin already exists');
  } else {
    await User.create({
      name: 'Administrator',
      email,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10),
      role: 'admin',
    });
    console.log(`Admin created: ${email}`);
  }
  await mongoose.disconnect();
})();