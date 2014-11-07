var  open = require('open')
	,express = require('express')
	,app = express();


/*
	routing
	---------------------------------
*/
app.get('/', function(req,res) {
	res.render('index');
});

app.use('/assets', express.static(__dirname+"/.public"));
app.set('view engine','ejs');


var server = app.listen(3000, function() {
	//open("http://"+server.address().address+":"+server.address().port);
	console.log('server running');
});