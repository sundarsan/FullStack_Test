


var application_root=__dirname;
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , login=require('./routes/login')
  ,dtb=require('./routes/dtbase')
  , http = require('http')
  , path = require('path');
  

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.cookieParser());
app.use(express.session({secret:'my secret code'}));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html',require('ejs').__express);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Route url=====================>
app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/login',login.index);
app.get('/task/create',login.getaddTask);
app.post('/task/create',dtb.addtask);
app.get('/task/destroy/:id',dtb.delTask);
app.get('/task/taskbyid',dtb.tedit);
app.post('/task/update',dtb.change);
app.get('/task',dtb.task);
app.post('/',login.logauth);

//app.get('/useredit',dtb.uedit);

//app.get('/userdelete',dtb.deluser);
app.get('/logout',login.logout);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
