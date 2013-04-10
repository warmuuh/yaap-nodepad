"use strict";



var processor = {

 annotation: "@Auth",
 processFunction: function(obj, fnDescription, annotationParams, context){
 
 
 }
};



module.exports = {
	wire$plugin: function(){
		var yaap = require("yaap");
		yaap.register(processor);
	}
};