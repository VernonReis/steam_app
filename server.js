// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const session = rquire("express-session");

// config
const PORT = 3000;

// db
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';
mongoose.connect(mongoURI, { useMongoClient: true });
mongoose.Promise = global.Promise;

// db error / success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Session variable
app.use(session({
    secret: "190fac13b3ee001ed103582abadf06",
    resave: false,
    saveUninitialized: false
}));

// controllers
const userController = require('./controllers/user.js');
app.use('/user', userController);