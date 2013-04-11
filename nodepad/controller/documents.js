"use strict";
function Controller (){
}

module.exports = Controller;
Controller.prototype = {
	"@Path": "/documents",
	
	init: function(Document)/*@Autowired @PostConstruct*/{
		this.Document = Document;
	},
	
	editDocument: function(/*@Callback*/_return, /*@Param*/id) /*@GET("/:id/edit")*/ {
		this.Document.findById(id, function(err, doc){
			_return({view:'documents/edit', model:{d:doc}});
		});
	},
	
	newDocument: function() /*@GET("/new")*/ {
		return {view:'documents/new', model:{d:{title:'New Document'}}};
	},
	
	listDocuments: function(/*@Callback*/_return) /*@GET("/") @Auth*/ {
		this.Document.find(function (err, docs){
			if (err) console.error(err);
			_return({view:'documents/index', model:{documents:docs}});
		});
	},
	getDocument: function(/*@Callback*/_return, /*@Param*/id) /*@GET("/:id") @JSON*/ {
		this.Document.findOne({'_id': id}, function (err, docs){
			if (err) console.error(err);
			_return(docs);
		});
	},
	createNewDocument: function(/*@Callback*/_return, /*@Body*/newDoc) /*@POST("/") @JSON*/ {
		var persDoc = new this.Document(newDoc);
		persDoc.save(function (err, d){
			if (err) console.error(err);
			_return(d);
		});
	},
	deleteDocument: function(/*@Callback*/_return, /*@Param*/id) /*@DELETE("/:id") @JSON*/ {
		this.Document.remove({'_id': id}, function(err){
			if (err) console.error(err);
			_return(null);
		});
	},
	updateDocument:  function(/*@Callback*/_return, /*@Param*/id, /*@Body*/newDoc) /*@PUT("/:id") @JSON*/ {

		this.Document.findByIdAndUpdate(id, newDoc, function(err, d){
			if (err) console.error(err);
			//_return("redirect:documents/");
			_return(d);
		});
	}

	

};

