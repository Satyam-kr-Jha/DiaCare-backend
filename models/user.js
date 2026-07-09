const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['patient', 'doctor'],
    default: 'patient'
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },

  age: {
    type: Number,
    min: 0,
  },
  
});

module.exports = mongoose.model('User', userSchema);