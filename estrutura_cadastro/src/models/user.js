const mongoose = require('mongoose');
const { model } = require('../database');

const UserSchema = new mongoose.UserSchema({
  name: {
    typetype: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);
modele.exports = User;