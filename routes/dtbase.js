

exports.addtask = function(req, res){
	var databaseUrl = "custdb";
    var collections = ["task"]
    var db = require("mongojs").connect(databaseUrl, collections);

  task = req.body.task;
  priority=req.body.priority;
  duedate=req.body.duedate;
 
   console.log(req.body);
  db.task.save({task: task,priority:priority,duedate:duedate}, function(err, task) {
  if( err || !task )
  {
  	res.status(500).send(err);
  }
  else
  {
  	res.status(200).send('Task Saved Successfully');
  }
  	
});
};


exports.task = function(req, res){
	
	var databaseUrl = "custdb"; 
    var collections = ["task"]
    var db = require("mongojs").connect(databaseUrl, collections);
    db.task.find('', function(err, tasks) {
		if( err || !tasks) 
		{
			//throw err;
			res.status(500).send(err);
		}
	  	else 
			{
				res.status(200).send(tasks);
	        }
  });
};


exports.delTask=function(req,res){
	
var id= req.params["id"];
var databaseUrl = "custdb"; 
  var collections = ["task"];
  console.log(id);
var db = require("mongojs").connect(databaseUrl, collections);

db.task.remove({"task": id}, function(err, deltask) {
		 if( err || !deltask) 
		 {
		 	res.status(500).send(err);
		 }
		 else 
		 {
			res.status(200).send(deltask);
		 }
      }); 	
};

exports.tedit=function(req,res){

var tid= req.query["task"];
var databaseUrl = "custdb"; 
  var collections = ["task"];
  console.log(tid);
var db = require("mongojs").connect(databaseUrl, collections);

db.task.find({"task": tid}, function(err, tasks) {
		
		 if( err || !tasks) 
		 {
		 	res.status(500).send(err);
		 }
		 else 
		    {
			    res.status(200).send(tasks);
			
		     }
      }); 
};


exports.change = function(req, res){
	
	var task = req.body.task;
  	var priority=req.body.priority;
  	var duedate=req.body.duedate;
  	//console.log(JSON.stringify(req.body));
  	console.log(task+" "+priority+" "+duedate);
	
	var databaseUrl = "custdb"; 
  	var collections = ["task"];
    var db = require("mongojs").connect(databaseUrl, collections);
	   

      var update = {
    	$set: { priority: priority,duedate:duedate}
  	};

  var query = {
    
    task: task
  };

  db.task.update(query, update, function(err, result) {
    if(err) { throw err; }
    		else
    			//res.end("<p>Product updated</p>");
    		res.status(200).send("Update successfully");
  });

    //console.log(uname+passwd);
};


