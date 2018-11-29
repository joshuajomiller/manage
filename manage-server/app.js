dotenv.load({ path: '.dev.env' });

var express = require('express');
var logger = require('morgan');

const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tokenDecode = require('./middleware/tokenDecode');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('./controllers/passport');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    err => {
        console.error(err);
        console.log('MongoDB connection error. Please make sure MongoDB is running.');
        process.exit();
    }
);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(tokenDecode);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
