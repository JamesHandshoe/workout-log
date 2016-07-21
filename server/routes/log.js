var router = require('express').Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log');

router.post('/', function(req, res){

	var description = req.body.log.desc;
	var result = req.body.log.result;
	var owner = req.user.id;
	var def = req.body.log.def;

	Log
		.create({
			description: description,
			result: result,
			owner: owner,
			def: definition
		})
		.then(
			function createSuccess(log){
				res.json(log);
			},
			function createError(err){
				res.send(500, err.message);
			}
		);
});

router.get('/', function(req, res){
	var owner = req.user.id;
	Log
	.findall({
		where: { owner: owner }
	})
	.then(
		function logSuccess(data){
			res.json(data);
		},
		function logError(err){
			res.send(500, err.message);
		}
	);
});

module.exports = router;