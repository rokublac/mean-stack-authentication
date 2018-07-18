// jshint esversion:6
const express = require('express'); // creating express app
const path = require('path'); // 
const bodyParser = require('body-parser'); // parse data
const cors = require('cors'); // allows request from different domain names
const passport = require('passport'); // authentication
const mongoose = require('mongoose'); // connect and use mongodb
const config = require('./config/database'); // mongodb database config

// connect to database (mongodb)
mongoose.connect(config.database, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
	console.log(`connected to database: ${config.database}`);
});
// log out any errors when connecting to database
mongoose.connection.on('error', (err) => {
	console.log(`database error: ${err}`);
});

// create express app
const app = express();
const port = process.env.PORT || 3000 ; // port for heroku deployment;

// bring in 'users' folder
const users = require('./routes/users');

// CORS middleware
app.use(cors());

// set static folder - grabs content in public folder when angular2 build was exported to
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// use '/user' for our user routes
app.use('/users', users);

// index route
app.get('/', (req,res) => {
	res.send('Invalid endpoint');
});

// every route aside from specified routes go to index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// initialise server
app.listen(port, () => {
	console.log(`server running on port: ${port}`);
});
