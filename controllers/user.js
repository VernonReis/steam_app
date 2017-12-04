const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const request = require('request');

const User = require('../models/user.js');


// My personal Steam API access Key
const apiKey = process.env.APIKEY || require("../apiKey.js");

router.get('/', async (req,res) => {
    allUsers = request("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + apiKey+"&steamid=76561197960434622&format=json", (error,response,body) => {
        test = JSON.parse(body);
        res.send(test);
    });
    // res.send(allUsers);
});





module.exports = router;