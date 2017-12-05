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

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (bcrypt.compareSync(req.body.password, user.password)) {
            req.session.username = req.body.username;
            req.session.isLogged = true;
            req.session.message = '';

            res.redirect('/')
        } else {
            req.session.message = 'Incorrect username or password';
            res.redirect('/user/login');
        }
    } catch (err) {
        req.session.message = 'Incorrect username or password';
        res.redirect('/user/login');
    }
});

router.post('/register', async (req, res) => {

    const pass = req.body.password;
    const passHash = bcrypt.hashSync(pass, bcrypt.genSaltSync(13));

    const newUser = {};
    newUser.username = req.body.username;
    newUser.password = passHash;

    try {
        const user = await User.create(newUser);
        req.session.username = user.username;
        req.session.isLogged = true;
        res.redirect('/');
    } catch (err) {
        req.session.message = 'User creation failed';
    }
});




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
            res.render('show.ejs', { games: result.games });
        },
    });
});


router.get('/:id', async (req, res) => {
    Steam.getOwnedGames({
        steamid: req.params.id,
        key: apiKey,
        include_appinfo: 1,
        appids_filter: [440, 500, 550],
    }).exec({
        // An unexpected error occurred.
        error: (err) => {

        },
        // OK.
        success: (result) => {
            res.render('show.ejs', { games: result.games });
        },
    });
});


module.exports = router;