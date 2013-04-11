"use strict";
/**
 * Module dependencies.
 */



//for debug
var crtl = require("./controller/documents"); 

var wire = require('wire');
var http = require('http');


 
wire({

	
	//model
	db: {create: './controller/db'},
	Document: {create:{module: './model/document', args: [{$ref: 'db'}]}},
	User: {create:{module: './model/user', args: [{$ref: 'db'}]}},
	
	//express and routes
	authentication_strategy :  {create: './controller/authStrategy'},
	app: {module: './controller/app'},
	documentHandler: {create: './controller/documents'},
	dashboardHandler: {create: './controller/dashboard'},
	userHandler: {create: './controller/users'},
	
	plugins: [
		{module: 'yaap/wire'},
		{module: 'yaap/wire/express', server: 'app'}
	]



}, {require:require}).then(function(ctx){

	var port = ctx.app.get('port');
	http.createServer(ctx.app).listen(port, function(){
	  console.log('Express server listening on port ' + port);
	});

}, function(err){console.log("error:"+ err);});
 
