// jshint esversion:6
const express = require('express');
const router = express.Router(); // express router
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/database');


// ==== CREATE ROUTES ====

// register
router.post('/register', (req, res, next) => {
	// create new instance of user
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser, (err, user) => {
		if(err){
			res.json({success: false, message: "Failed to register user."});
		} else {
			res.json({success: true, message: "Successfully registered user."});

		}
	});
});

// authenticate
router.post('/authenticate', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
		// other errors
		if(err){
			throw err;
		}
		// if there is no such user in the database
		if(!user){
			return res.json({sucess: false, message: "User not found"});
		}
		// compare the user input password to the has password in the db
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err){
				throw err;
			}
			// if user and password matches the pair in the database
			if(isMatch){
				const token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn: 86400 // 1 day in seconds
				});

				res.json({
					success: true,
					token: `JWT ${token}`,
					// this user is retrieved from getUserByUsername function
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email
					}
				});
			// authentication fail message
			} else {
				res.json({success: false, message: "Invalid username-password pair"});
			}

		});
	});
});

// profile
router.get('/profile', passport.authenticate('jwt', { session:false }), (req, res, next) => {
	res.json({ user: req.user });
});

module.exports = router;