const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const request = require('request');
const Steam = require('machinepack-steam');

const User = require('../models/user.js');


// My personal Steam API access Key
const apiKey = process.env.APIKEY || require("../apiKey.js");

// router.get('/', async (req, res) => {
//     allUsers = request("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + apiKey + "&steamid=76561197960434622&format=json", (error, response, body) => {
//         test = JSON.parse(body);
//         res.send(test);
//     });
//     // res.send(allUsers);
// });





router.get('/', async (req, res) => {
    Steam.getOwnedGames({
        steamid: '76561197989223555',
        key: apiKey,
        include_appinfo: 1,
        appids_filter: [440, 500, 550],
    }).exec({
        // An unexpected error occurred.
        error: (err) => {

        },
        // OK.
        success: (result) => {
            res.send(result);
        },
    });
});


module.exports = router;