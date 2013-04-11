"use strict";

var crypto = require("crypto");

    
module.exports = function(db){
	var userSchema = db.Schema({name:String, 
								email:String, 
								hashed_password:String,
								salt: String
								
								//indexes: [ [{ name: 1 }, { unique: true }] ]
								});
	userSchema.index({name:1},{unique:true});
	
	userSchema.methods.encryptPassword = function(password) {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    };
    userSchema.methods.makeSalt = function(password) {
       return Math.round((new Date().valueOf() * Math.random())) + '';
    };
    
    userSchema.methods.authenticate = function(plainText) {
		var enc = this.encryptPassword(plainText);
		return  enc === this.hashed_password;
    };
    
    userSchema.virtual('password')
		.set(function(password){
			this._password = password;
			this.salt = this.makeSalt();
			this.hashed_password = this.encryptPassword(password);
		}).get(function(){
			return this._password;
		});
	db.model('User',userSchema);
	return db.model('User');
};