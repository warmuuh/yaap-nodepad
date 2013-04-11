module.exports = Dashboard;
function Dashboard (){

};

Dashboard.prototype = {

	showDashboard: function(/*@Req*/req)/*@GET("/") @Auth*/{
		return {view:'dashboard', model: {user:req.getAuthDetails().user}};
	}

};
