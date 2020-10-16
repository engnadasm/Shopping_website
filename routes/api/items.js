const express = require('express');
const router = express.Router();

//Item model
const Item = require('../../models/Item');

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */


router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    if (!items) throw Error('No items');

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/items
 * @desc    Create An Item
 * @access  Private
 */

router.post('/', async (req, res) => {
  const {name,price,category,mainPic,pic,quantity,rating} = req.body
   if(!name|| !price || !category || !quantity){
     return  res.status(422).json({error:"Plase add all the fields"})
   }
//  req.user.password = undefined
  const newItem = new Item({
    name: req.body.name,
    price : req.body.price,
    class: req.body.class,
    category: req.body.category,
    mainPic: req.body.mainPic,
    Pic: req.body.Pic,
    quantity: req.body.quantity,
    rating:req.body.rating,
    postedBy:req.user
  });

  try {
    const item = await newItem.save();
    if (!item) throw Error('Something went wrong saving the item');

    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/items/:id
 * @desc    Delete A Item
 * @access  Private
 */

router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw Error('No item found');

    const removed = await item.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the item');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

router.put('/reviews',async (req,res)=>{
    const review = {
        text:req.body.text,
      //  postedBy:req.user._id
    }
    Item.findByIdAndUpdate(req.body.postId,{
        $push:{reviews:review}
    },{
        new:true
    })
    .populate("reviews.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
});


module.exports= router;
