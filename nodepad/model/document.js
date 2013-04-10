"use strict";

module.exports = function(db){

	return db.model('Document',
				db.Schema({
					title:String, 
					data:String, 
					tags:String
				}));
};