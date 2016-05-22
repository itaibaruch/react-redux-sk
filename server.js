var path = require('path');
var express = require('express');
var apiCtr = require('./apiCtr');

var app = express();

app.use('/', express.static('public'));
app.use('/json', express.static('json'));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

apiCtr(app);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// var server = app.listen(process.env.PORT || 3000, function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Listening at http://%s:%d', 'localhost', server.address().port);
// });

var port = Number(process.env.PORT || 3000);

app.listen(port);
