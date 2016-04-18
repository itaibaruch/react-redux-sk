var path = require('path');
var bodyParser =require('body-parser');
var fs = require('fs');
var _ = require('lodash');
var jsonUrl = path.join(__dirname, 'json/fakeData.json');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // read all
  app.get('/api/posts', function(req, res) {
    // res.sendFile(path.join(__dirname, 'json/fakeData.json'));
    var readable = fs.createReadStream(
      jsonUrl, 
      { encoding: 'utf8', highWaterMark: 16 * 1024}
    );
    readable.pipe(res);
  });
  // read by Id
  app.get('/api/posts/:id', function(req, res) {
    var id = req.params.id
    var file = fs.readFile(jsonUrl, 'utf8', function(err, data) {
      if(err) throw err;

      var jsonData = JSON.parse(data);
      res.setHeader('Content-Type', 'application/json');
      var objFind = _.find(jsonData, function(obj) { return obj.id == id });
      res.send(JSON.stringify( objFind ));
    });
  });
  // create new
  app.post('/api/posts', function(req, res) {
    // var newPost = {
    //   title: req.body.title,
    //   categories: req.body.categories,
    //   content: req.body.content
    // }
    var newPost = req.body;
    var file = fs.readFile( jsonUrl, 'utf8', function(err, data) {
      if(err) throw err;

      var jsonData = JSON.parse(data);
      var d = new Date();
      newPost['id'] = d.getTime();
      jsonData.push(newPost);

      // writeToJsonAndSend( jsonData, res );
      writeToJson( jsonData, res, function() {
        sendTheJson(newPost, res);
      });
    });
  });
  // delete by Id
  app.delete('/api/posts/:id', function(req, res) {
    var id = req.params.id
    var file = fs.readFile( jsonUrl, 'utf8', function(err, data) {
      if(err) throw err;

      var jsonData = JSON.parse(data);
      var deleted = _.remove(jsonData, function(currentObject) {
        return currentObject.id == id;
      });
      writeToJson( jsonData, res, function() {
        sendTheJson(deleted[0], res);
      });
    });
  });

  // edit by Id
  app.put('/api/posts/edit/:id', function(req, res) {
    var id = req.params.id;
    var editedPost = req.body;
    if( !editedPost[id] ) editedPost['id'] = parseInt(id);
    var file = fs.readFile(jsonUrl, 'utf8', function(err, data) {
      if(err) throw err;

      var jsonData = JSON.parse(data);
      var result = _.mergeById(jsonData, editedPost, "id");
      writeToJson( result.arr, res, function() {
        sendTheJson(result.obj, res);
      });
    });
  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}



// helpers
function writeToJsonAndSend(data, res){
  var write = fs.writeFile( jsonUrl, JSON.stringify(data), 'utf8', function(err, data) {
    if(err) throw err;

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify( data ));
  })
};
function writeToJson(data, res, cb){
  var write = fs.writeFile( jsonUrl, JSON.stringify(data), 'utf8', function(err, data) {
    if(err) throw err;

    cb();
  })
};
function sendTheJson(data, res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify( data ));
};

_.mixin({
  mergeById: function mergeById(arr, obj, idProp) {
    var index = _.findIndex(arr, function (elem) {
        return typeof elem[idProp] !== "undefined" && elem[idProp] === obj[idProp];
    });
    if (index > -1) {
      arr[index] = this.merge({}, arr[index], obj);; 
    } else {
      arr.push(obj);
    }
    return {
      arr: arr,
      obj: obj
    };
  }
});

// var readable = fs.createReadStream(
//   jsonUrl, 
//   { encoding: 'utf8', highWaterMark: 16 * 1024}
// );
// var writeable = fs.createWriteStream(
//   path.join(__dirname, 'json/fakeDataId.json')
// );
// readable.on('data', function(chunck){
//   writeable.write(chunk);
// })
// read.pipe(writeable);
