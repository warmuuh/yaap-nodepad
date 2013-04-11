module.exports = Users;
function Users (){

};

Users.prototype = {
	"@Path": "/users",
	newUser: function()/*@GET("/new")*/{
		return 'users/new';
	},
	
	registerUser: function(/*@Param*/ user, /*@Autowired*/User,  /*@Callback*/_return)/*@POST("/")*/{
		if(validateUser(user)){
			var newUser = new User(user);
			newUser.save(function(err, user){
				console.log(err);
				if (err)
					_return('users/new');
				else{
					console.log("saved:");
					console.log(user);
					_return('redirect:/');
				}
			});
		}
		else
			_return('users/new');
	}

};


function validateUser(user){
	return user != null 
			&& user.name != null 
			&& user.email != null
			&& user.password != null;

}