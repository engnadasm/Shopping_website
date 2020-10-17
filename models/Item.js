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
        text:String,
        postedBy:{type:ObjectId,ref:"user"}
    }],
  postedBy:{
       type:ObjectId,
       ref:"user"
    }
});

const Item = model('item', ItemSchema);

module.exports= Item;
