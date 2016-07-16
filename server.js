var path = require('path');
var express = require('express');
var apiCtr = require('./apiCtr');

var app = express();

app.use('/public', express.static('public'));
app.use('/json', express.static('json'));

apiCtr(app);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var port = Number(process.env.PORT || 3000);

app.listen(port);
