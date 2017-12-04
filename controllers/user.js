const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');



router.get('/', async (req,res) => {
    const allUsers = await User.find();
    res.send(allUsers);
});





module.exports = router;