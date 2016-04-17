var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var apiCtr = require('./apiCtr');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

// app.get('/posts', function(req, res) {
//   res.sendFile(path.join(__dirname, 'json/fakeData.json'));
// });
apiCtr(app);
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

var server = app.listen(process.env.PORT || 3000, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://%s:%d', 'localhost', server.address().port);
});
