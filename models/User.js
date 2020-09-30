const mongoose = require('mongoose');//we use it as database
//for validation of email
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Schema

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  emailORphone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String
  }
});

const User = model('user', UserSchema);

module.exports= User;
