const mongoose = require('mongoose');//we use it as database
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Schema

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = model('item', ItemSchema);

module.exports= Item;
