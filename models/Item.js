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
    default: "no photo"
  },
  Pic: {
    type: String,
    default: "no photo"
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
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
