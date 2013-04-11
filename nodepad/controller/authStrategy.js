module.exports= function(options) {
  options= options || {};
  var UserDao = null;
  
  
  function validate_user(username, password, success, failed){
   UserDao.findOne({name:username}, function(err, user){
		if (user && user.authenticate(password)) 
			success(user);
		else
			failed(err);
   });
  }
  
  
  
  return {
	name: "FORM-based",
	authenticate: function(req, res, next) {
		var userDetails = req.session && req.session.user;
		if (userDetails != null) //null or undefined
			this.success( userDetails, next );
		else{
			res.redirect("/auth/login?redirect="+req.url);
		}
	},
	init: function(User)/*@PostConstruct @Autowired*/{
		UserDao = User;
	},
	
	showLogin: function(/*@Param*/redirect)/*@GET("/auth/login")*/{
		return {view: 'auth/login', model: {redirect: redirect, failed: false}};
	},
	validateLogin: function(redirect, username, password, /*@Session*/session, /*@Callback*/_return)/*@POST("/auth/login") @Param*/{
		redirect = redirect || '/';
		validate_user(username, password, 
		function(user){
			session.user = {name: username};
			_return( 'redirect:'+redirect);
		},
		function(err){
			_return( {view: 'auth/login', model: {redirect: redirect, failed: true}});
		}
		);		
	},
	logout: function(/*@Session*/session)/*@GET("/auth/logout") @Auth*/{
		delete session.user;
		return "redirect:/";
	}
	
  };
};  