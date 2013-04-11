
var validatePasswordFunction = function(username, password, successCallback, failureCallback){
	console.log("testing: " + username + "  " + password);
	if (username === 'foo' && password === "bar"){
		successCallback();
	} else {
		failureCallback();
	}
};



var path = require('path'); 
var express = require('express');
var auth = require('connect-auth');

var app = module.exports = express();

module.exports._initialize = function(authentication_strategy)/*@PostConstruct @Autowired*/{
	
// all environments
	app.set('port', process.env.PORT || 3000);
	//app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	
	//user auth
	//app.use(auth({trace:true, strategies:[ auth.Basic({validatePassword: validatePasswordFunction}) ]}));
 app.use(auth({trace:true, strategies:[ authentication_strategy ]}));
	
	//session handling
	app.use(express.cookieParser());
	app.use(express.session({
		store: new express.session.MemoryStore(),
		secret: 'secret',
        key: 'bla'
	}));

	//and register session-access from jade
	app.use(function(req, res, next){
		if (res.locals == null)
			res.locals = {};
	    res.locals.session = req.session;
	    next();
	});


	
	
	app.use(express.methodOverride());
	
	
	
	
	
	
	app.use(app.router);
	//app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static('public'));


	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}
};


