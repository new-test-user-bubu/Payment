import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

dotenv.config();

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminUsername || !adminPassword) {
      console.error('Missing admin credentials in environment variables');
      console.error('Required: ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD');
      process.exit(1);
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    await User.create({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created successfully');
    console.log(`Username: ${adminUsername}`);
    console.log(`Email: ${adminEmail}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
