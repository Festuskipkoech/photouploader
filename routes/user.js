const express = require('express');
const multer = require('multer'); //assosiated with the storage
const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination:function (req, file, cb) {
    cb(null, 'uploads/'); //must have folder to be creayed to save the photos
    
  },
  filename:function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Register route
router.post('/register', upload.single('photo'), async (req,res) =>{
  try {
    const { username, email, password } =req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
       email,
       password:hashedPassword,
       photo:req.file.path, // stores file paths
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error : 'Error registering user'})
  }
})

// Get user profile// In userRoutes.js
router.get('/profile/:id', async (req,res) =>{
  const userId =req.params.id;
  try {
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({ message : 'User not found'});
    res.json(user)

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error '});
  }
})
  

module.exports = router;
