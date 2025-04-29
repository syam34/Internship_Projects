// createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      email: 'admin@gmail.com',
      password: hashedPassword,
    });
    await admin.save();
    console.log('Admin created!');
    process.exit();
  })
  .catch(err => console.log(err));
