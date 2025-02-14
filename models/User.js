const mongoose = require('mongoose');//we use it as database
//for validation of email
const Schema = mongoose.Schema;
const model = mongoose.model;
const {ObjectId} = mongoose.Schema.Types

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
    type: String,
    required: true
  },
  src:{
     type:String,
     default:"http://simpleicon.com/wp-content/uploads/account.png"
  },
  favorite:[{type:ObjectId,ref:"item"}],
  cart:[{type:ObjectId,ref:"item"}]

});

const User = model('user', UserSchema);

module.exports= User;
