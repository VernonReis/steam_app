const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const request = require('request');
const Steam = require('machinepack-steam');

const User = require('../models/user.js');
const Library = require('../models/library.js');


// My personal Steam API access Key
const apiKey = process.env.APIKEY || require("../apiKey.js");


router.get('/', async (req, res) => {
    Steam.getOwnedGames({
        steamid: '76561197989223555',
        key: apiKey,
        include_appinfo: 1,
        appids_filter: [440, 500, 550],
    }).exec({
        // An unexpected error occurred.
        error: (err) => {
            res.send(err);
        },
        // OK.
        success: (result) => {
            res.render('test.ejs', { games: result.games });
        }
    });
});


router.get('/game/:id', async (req, res) => {
    allUsers = request("http://store.steampowered.com/api/appdetails?appids="+req.params.id, (error,response,body) => {
        test = JSON.parse(body);

        game = test[req.params.id];

        myGame = {
            title: game.data.name,
            img: game.data.header_image,
            rating: "",
            description: game.data.detailed_description,
        }

        console.log(myGame.id);

        res.render('testshow.ejs', {game: myGame});
    });
    // res.send(allUsers);
});

router.get('/:id', async (req, res) => {
    Steam.getOwnedGames({
        steamid: String(req.params.id),
        key: apiKey,
        include_appinfo: 1,
        appids_filter: [440, 500, 550],
    }).exec({
        // An unexpected error occurred.
        error: (err) => {
            res.send(err);
        },
        // OK.
        success: (result) => {
            res.render('test.ejs', { games: result.games });
        }
    });
});



module.exports = router;