var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//gets the module sequelize
var Sequelize = require('sequelize');

//connects to postgres gives location and what time of db client
var sequelize = new Sequelize('workoutlog', 'postgres', 'Jsb59733', {
	host: 'localhost',
	dialect: 'postgres'
});

//makes sure that we are connected
sequelize.authenticate().then(
	function(){
		console.log('connected to workoutlog postgres db');
	},
	function(){
		console.log(err);
	}
);

//user model created using sequelize
//talks to the table user
var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING
});

//creates the table in postgres
User.sync(); //to drop a table  User.sync({force: true}); drops the table and recreates it


app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.post('/api/user', function(req, res){

		var username = req.body.user.username;
		var pass = req.body.user.password; //TODO: hash this password

		User.create({
			username: username,
			passwordhash: '' //TODO: make it hashed
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

//route with express
app.use('/api/test', function(req, res){
	res.send("hello world");
});
app.listen(3000, function(){
	console.log("app is listening of port 3000");
});

