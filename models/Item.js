const mongoose = require('mongoose');//we use it as database
const Schema = mongoose.Schema;
const model = mongoose.model;
const {ObjectId} = mongoose.Schema.Types

// Create Schema

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  mainPic: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg"
  },
  Pic: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2017/02/08/14/25/computer-2048983_960_720.jpg"
  },
  quantity: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now
  },
  stare:{
    type: Boolean,
    default: false
  },
  cart:{
    type: Boolean,
    default: false
  },
  reviews:[{
        text:{
          type: String,
          default: "none"
        },
        postedBy:{type:ObjectId,ref:"user"},
        name:String,
        rating:Number,
        src:{
          type: String,
          default: "http://simpleicon.com/wp-content/uploads/account.png"
        }
    }],
  postedBy:{
       type:ObjectId,
       ref:"user"
    }
});

const Item = model('item', ItemSchema);

module.exports= Item;
