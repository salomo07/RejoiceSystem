var {Mongo,app,express,bodyParser,cookieParser,http,path,server,bcrypt,saltRounds,FCM} =require ("./init.js");
var token = 'eVvucQXMInM:APA91bGBluv5EWYMFs7G5RkpPAmVAcZWmJauySDX3ZIy0npSsms1y9wNJsKoIz5Mxdw51Xh59FNlD8YPmssay728IlY22FSJjMVNIAr2v0LGdwrUH3ob7HxQLUaym2o1tQV6X5gz-Xb9';
 
var message ={
	"token" : token,
	"data":{
      "Nick" : "Mario",
      "body" : "great match!"
    }
}
// "notification" : {"title":"Portugal vs. Denmark","body":"Bodyyyyyyyyyyyyyyyyyyyy"}	

// FCM.send(message, function(err, response) {
//     if(err){
//         console.log(err.errorInfo.message);
//     }
// })

server.listen(process.env.PORT || 3000,()=>{
});
app.use(express.static(__dirname + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.get('/',(req,returnAPI)=>{
	// new Mongo().streamMongo((err,res)=>{
	// 	console.log(res);
	// });

	if(req.cookies.userdata ==undefined)
	returnAPI.sendFile(path.join(__dirname + '/login.html'));
	else returnAPI.redirect('/chat')
});
app.post('/api',(req,returnAPI)=>{	
	returnAPI.send("Welcome to API. All request must be JSON type. 'Content-Type': 'application/json'");
});
app.get('/chat',(req,returnAPI)=>{
	if(req.cookies.userdata ==undefined)
	{
		returnAPI.redirect('/')
	}
	else returnAPI.sendFile(path.join(__dirname + '/chat.html'));
});

app.post('/loginweb',(req,returnAPI)=>{
	var userData, reqPassword;
	if (req.body.username!=undefined) {
		req.body.username={'$eq' : req.body.username}
	}
	if (req.body.password!=undefined) {
		reqPassword=req.body.password;
		delete req.body.password
	}
	// bcrypt.hash(reqPassword, saltRounds, function(err, hash) {
	//   console.log(hash);
	// });
	new Mongo().findOne('users',req.body,(res)=>{
		console.log(res)
		if(res==null)
		{returnAPI.redirect('/');}
		else
		{
			bcrypt.compare(reqPassword, res.password, function(e, r) {
				if(r==true)
				{
					new Mongo().findUserDetail(req.body,(res)=>{
						
						returnAPI.cookie('userdata',res._id,{maxAge: 3600000*8});
						returnAPI.redirect('/chat');
					});
				}
				else
				{returnAPI.json([]);}
			});
		}
	});
});
app.post('/api/getuserdetail/',(req,returnAPI)=>{ //Should have "password" on request and username must equals
	var userData, reqPassword;
	// console.log(req);
	// console.log(req.protocol,typeof req.headers.accept);
	if (req.body.username!=undefined) {
		req.body.username={'$eq' : req.body.username}
	}
	if (req.body.password!=undefined) {
		reqPassword=req.body.password;
		delete req.body.password
	}

	// bcrypt.hash(reqPassword, saltRounds, function(err, hash) {
	//   console.log(hash);
	// });
	new Mongo().findOne('users',req.body,(res)=>{
		if(res==null)
		{returnAPI.json([]);}
		else
		{
			bcrypt.compare(reqPassword, res.password, function(e, r) {
				if(r==true)
				{
					new Mongo().findUserDetail(req.body,(res)=>{
						returnAPI.json(res);
					});
				}
				else
				{returnAPI.json([]);}
			});
		}
	});
});
app.post('/api/updateuser',(req,returnAPI)=>{
	new Mongo().update('users',{_id:req.body._id},req.body,(res)=>{});
});
app.post('/api/getdata',(req,returnAPI)=>{
	// new Mongo().find(req.query.coll,req.body,(res)=>{
	// 	console.log(res)
	// 	returnAPI.json(res);
	// })
	// console.log(req)
	new Mongo().aggregate(req.body.coll1,req.body.coll2,req.body.localfield,req.body.foreignfield,'data',req.query,(res)=>{
		returnAPI.json(res);
	})
	// ('users',{_id:req.body._id},req.body,(res)=>{});
});
// app.get('/favicon.ico', (req, res) => {
// 	res.sendStatus(404);
// });
