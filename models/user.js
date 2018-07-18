// jshint esversion:6
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// User schema
const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

//export user schema
const User = module.exports = mongoose.model('User', UserSchema);

// ==== EXPORT FUNCTIONS ====
// find user by id
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
};

//find user by username
module.exports.getUserByUsername = function(username, callback){
	const query = {username: username};
	User.findOne(query, callback);
};

// add new user
module.exports.addUser = function(newUser, callback){
	// generate salt for hash
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err){
				throw err;
			}
			// store hash password as user password
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

// compare password to hash password in database
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err){
			throw err;
		}
		callback(null, isMatch);
	});
};

