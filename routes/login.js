



exports.index = function(req, res){
 res.redirect('/index');
};

exports.getaddTask = function(req, res){
  res.render('addtask',{msg:''});
};


exports.logauth = function(req, res){
	
			 
		  
    	var uname=req.body.uname;
		var passwd=req.body.passwd;
		if(uname=='arijit' && passwd=='passwd')
		{
			req.session.uuname=uname;
			res.render('Home',{msg:'',loggeduser:req.session.uuname});			
                        
		}
		else
		{
			res.render('index',{msg:'Check your user id and password'});
		}
};


exports.logout = function(req, res){
 req.session.destroy(); 
 res.redirect('/');
};
