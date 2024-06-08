import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import sqlite3 from 'sqlite3';
import expressfileupload from 'express-fileupload';
let app = express();
let  router = express.Router()
app.use(expressfileupload({safeFileNames: true, preserveExtension: true }));
app.use(bodyParser.urlencoded({extended: true}));
nunjucks.configure('html', {
  autoescape:  true,
  express:  app
})
let secret = 'qwerty';
app.use(expressSession({
  secret: secret,
}));
app.use(express.static('css'));
var db = new sqlite3.Database('anime.db');

app.get('/', function(req,res){
  for (const key in req.query) {
    req.session.test = req.query[key];
  }
  if(req.session.test == undefined){
    req.session.test = "light";
  }

  let items;
  db.serialize(function() {
    db.all('SELECT * FROM tovar_skidka', function(err, row) {
      items = row;
      res.render('index.html',{
        items,
        test: req.session.test
      });
    });
  });
});

app.use(function(req, res) {
  res.status(404)
  res.render('404.html')
});
app.listen(3000, function() {
  console.log('running');
});