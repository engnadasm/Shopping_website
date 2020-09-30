//Message
const mongoose = require('mongoose');//we use it as database
//for validation of email
require('mongoose-type-email');

const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Schema

const MessageSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const Message = model('message', MessageSchema);

module.exports= Message;
