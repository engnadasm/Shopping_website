const express = require('express');
const router = express.Router();

//user model
const Message = require('../../models/Message');


/**
 * @route   POST api/users
 * @desc    Create An user
 * @access  Private
 */

router.post('/', async (req, res) => {
  const newMessage = new Message({
  userName: req.body.userName,
  email: req.body.email,
  phone: req.body.phone,
  message: req.body.message
  });

  try {
    const message = await newMessage.save();
    if (!message) throw Error('Something went wrong saving the message');

    res.status(200).json(message);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});


module.exports= router;
