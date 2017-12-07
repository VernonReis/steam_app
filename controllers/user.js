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


    res.redirect('/user/login');
    // Steam.getOwnedGames({
    //     steamid: '76561197989223555',
    //     key: apiKey,
    //     include_appinfo: 1,
    //     appids_filter: [440, 500, 550],
    // }).exec({
    //     // An unexpected error occurred.
    //     error: (err) => {
    //         res.send(err);
    //     },
    //     // OK.
    //     success: (result) => {
    //         res.send(result);
    //         // res.render('index.ejs', { games: result.games });
    //     }
    // });
});


router.get('/games', async (req, res) => {
    if (req.session.isLogged == true) {
    const games = await Library.find({ userId: req.session.userId });
    console.log(games);
    res.render('show.ejs', { hasGames: true, games });
    }
    else
    {
        res.redirect("/user/login");
    }
});

router.get('/games/new', async (req, res) => {
    if (req.session.isLogged == true) {
    res.render('new.ejs');
    }
    else
    {
        res.redirect("/user/login");
    }
});

router.get('/games/edit/:id', async (req, res) => {
    if (req.session.isLogged == true) {
    const game = await Library.findOne({_id: req.params.id});
    res.render('edit.ejs', {game})
    }
    else
    {
        res.redirect("/user/login");
    }
});

router.post('/games/new', async (req, res) => {
    
    if (req.session.isLogged == true) {

            const newGame = {};
            newGame.title = req.body.title;
            newGame.img = req.body.image;
            newGame.isFavorite = false;
            newGame.userId = req.session.userId;
            console.log(newGame.userId);

            try {
                const game = await Library.create(newGame);
                res.redirect('/user/games');
            } catch (err) {
                console.log(err);
                req.session.message = 'User creation failed';
                res.render('/user/register', { duplicateUser: true });
            }
        }
        else {
            res.redirect('/user/login');
        }    
});

router.post('/games/edit', async (req, res) => {
    
    if (req.session.isLogged == true) {

            await Library.update({_id: req.body.id},{$set: {title: req.body.title, img: req.body.image}})

            try {
                const game = await Library.create(newGame);
                res.redirect('/user/games');
            } catch (err) {
                console.log(err);
                res.redirect('/user/games');
            }
        }
        else {
            res.redirect('/user/login');
        }    
});


router.post('/games/import', async (req, res) => {
    res.redirect('/games/import/'+req.body.steamId);
});

router.get('/games/import/:id', async (req, res) => {
    if (req.session.isLogged == true) {
    res.redirect('/games/import/'+req.body.steamId);
    }
    else
    {
        res.redirect("/user/login");
    }
});


router.delete('/games/delete', async (req, res ) => {
    await Library.remove({_id: req.body.id});
    res.redirect('/user/games');
});


router.get('/login', async (req, res) => {

    res.render('login.ejs');
});

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });
        if (bcrypt.compareSync(req.body.password, user.password)) {
            req.session.username = req.body.username;
            req.session.isLogged = true;
            req.session.message = '';
            req.session.userId = user._id;

            res.redirect('/user/games')
        } else {
            req.session.message = 'Incorrect username or password';
            res.redirect('/user/login');
        }
    } catch (err) {
        req.session.message = 'Incorrect username or password';
        res.redirect('/user/login');
    }
});


router.get('/register', async (req, res) => {

    res.render('register.ejs');
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
        res.render('/user/register', { duplicateUser: true });
    }
});


router.get('/logout',  (req, res) => {
        req.session.destroy();
        res.redirect("/user/login");
});



// router.get('/', async (req, res) => {
//     Steam.getOwnedGames({
//         steamid: '76561197989223555',
//         key: apiKey,
//         include_appinfo: 1,
//         appids_filter: [440, 500, 550],
//     }).exec({
//         // An unexpected error occurred.
//         error: (err) => {
//             res.send(err);
//         },
//         // OK.
//         success: (result) => {
//             res.render('show.ejs', { games: result.games });
//         }
//     });
// });


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