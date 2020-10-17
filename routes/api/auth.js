const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { emailORphone, password } = req.body;

  // Simple validation
  if(!emailORphone || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ emailORphone })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User Does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  userName: user.userName,
                  emailORphone: user.emailORphone
                }
              });
            }
          )
        })
    })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

router.put('/favorite',auth,(req,res)=>{
  console.log(req.body);
    User.findByIdAndUpdate(req.user.id,{
        $push:{favorite:req.body.shopObjects._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
    }
    )
})
router.put('/unfavorite',auth,(req,res)=>{
  console.log(req.body);
    User.findByIdAndUpdate(req.user.id,{
        $pull:{favorite:req.body.shopObject._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
    }
    )
})

router.put('/cart',auth,(req,res)=>{
  console.log(req.body);
    User.findByIdAndUpdate(req.user.id,{
        $push:{cart:req.body.shopObjects._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
    }
    )
})
router.put('/uncart',auth,(req,res)=>{
    User.findByIdAndUpdate(req.user.id,{
        $pull:{cart:req.body.shopObject._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
    }
    )
})

router.put('/updatepic',auth,(req,res)=>{
    User.findByIdAndUpdate(req.user.id,
      {$set:{src:req.body.src}},
      {new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"pic canot post"})
         }
         res.json(result)
    })
})

router.put('/updateInf',auth,(req,res)=>{
    User.findByIdAndUpdate(req.user.id,
      {$set:{userName:req.body.userName,gender:req.body.gender}},
      {new:true},
        (err,result)=>{
         if(err){
             return res.status(422).json({error:"update canot post"})
         }
         res.json(result)
    })
})


router.post('/reset-password',(req,res)=>{
     crypto.randomBytes(32,(err,buffer)=>{
         if(err){
             console.log(err)
         }
         const token = buffer.toString("hex")
         User.findOne({emailORphone:req.body.emailORphone})
         .then(user=>{
             if(!user){
                 return res.status(422).json({error:"User dont exists with that email"})
             }
             user.save().then((result)=>{
                 transporter.sendMail({
                     to:user.email,
                     from:"no-replay@insta.com",
                     subject:"password reset",
                     html:`
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                     `
                 })
                 res.json({message:"check your email"})
             })

         })
     })
})


router.put('/new-password',auth,(req,res)=>{
    console.log(req.body.password)

    bcrypt.hash(req.body.password,10)
     .then(hashedpassword=>{
       console.log(hashedpassword);
       User.findByIdAndUpdate(req.user.id,
         {$set:{password:hashedpassword}},
         {new:true},
           (err,result)=>{
            if(err){
                return res.status(422).json({error:"pic canot post"})
            }
            res.json(result)
       })
    })
})

module.exports = router;
