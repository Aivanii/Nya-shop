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
let username;
let age;
let secret = 'qwerty';
app.use(expressSession({
  secret: secret,
}));
app.use(express.static('css'));
var db = new sqlite3.Database('anime.db');
let error;
app.get('/', function(req,res){
  let items;
  db.serialize(function() {
    db.all('SELECT * FROM tovar WHERE discount IS NOT NULL', function(err, row) {
      if(username){
        db.get('SELECT age FROM user WHERE username = ?', [username], function(err, row) {
          age = row.age
        });
      }
      items = row;

      res.render('index.html',{
        items,
        age
      });
    });
  });
});
app.get('/Basa', function(req,res){
  console.log(username);
  db.serialize(function(){
    db.get('SELECT username, mail, name, surname FROM user WHERE username = ?', [username], function(err,row){
      res.render('user_page.html', row);
    });
  });
    
});
app.post('/Log', function(req,res){
  db.serialize(function() {
    db.get('SELECT username, mail, password, age FROM user WHERE mail = ?', [req.body.email], function(err,row){
      
      if(row != undefined){
        console.log(row)
        if(req.body.password == row.password){
          username = row.username
          age = row.age
          res.redirect('/Basa')

        }
      }else{
        db.all('SELECT COUNT(*) FROM user', function(err,rod){
          let y = rod[0];
          y = y['COUNT(*)']
          y += 1
          console.log(y, req.body.email, req.body.password)
          username = 'user' + y
          let save = db.prepare('INSERT INTO user(id, username, mail, password) VALUES (?, ?, ?, ?)', [y, username, req.body.email, req.body.password]);
          save.run();
          save.finalize();
          res.redirect('/Basa')
        });
        
      }
    });
  });
});
app.get('/Age', function(req,res){
  res.render('age_checking.html');
});
app.post('/Age', function(req,res){
  let now = new Date();
  let DOB = new Date(req.body.DOB);
  
  let x = (now - DOB)/31536000000
  console.log(x)
  if(username){
    db.serialize(function(){
      let save = db.prepare('INSERT INTO user(age) VALUES (?) WHERE username = ?', [x, username]);
      save.run();
      save.finalize();
    });
  }else{
    age = x
  }
  if(age >= 18){
    res.redirect('/')
  }else{
    res.redirect('/');
  }
  
});
app.get('/error', function(req,res){
  res.render('error.html');
});
app.use(function(req, res) {
  res.status(404)
  res.render('404.html')
});
app.listen(3000, function() {
  console.log('running');
});