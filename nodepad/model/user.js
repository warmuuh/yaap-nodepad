"use strict";

module.exports = function(db){

	return db.model('User',
				db.Schema({
					name:String, 
					email:String, 
					password:String
				}));
};