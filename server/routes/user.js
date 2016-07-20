//.Router() makes app.js server be aware this is
//a route
var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//this portion of the script takes the modeled 
//user data and  and makes a virtual table
router.post('/', function(req, res){

		var username = req.body.user.username;
		var pass = req.body.user.password; 

		//the user model communicates with postgres to create a new user
		User.create({
			username: username,
			passwordhash: bcrypt.hashSync(pass, 10)
		}).then(
			function createSuccess(user){
				res.json({
					user: user,
					message: 'created'
				});
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
});


module.exports = router;
