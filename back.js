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
let username = null;
let age;
let items;
let id;
let secret = 'qwerty';
app.use(expressSession({
  secret: secret,
}));
app.use(express.static('css'));
var db = new sqlite3.Database('anime.db');
let error;
app.get('/', function(req,res){
  
  db.serialize(function() {
    db.all('SELECT * FROM goods WHERE discount IS NOT NULL', function(err, row) {
      if(username){
        db.get('SELECT age FROM user WHERE username = ?', [username], function(err, row) {
          age = row.age   
        });
      }
      items = row;
      res.render('index.html',{
        items,
        age,
        username
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
app.post('/error', function(req,res,next){
  db.serialize(function() {
    db.get('SELECT username, mail, password, age FROM user WHERE mail = ?', [req.body.email], function(err,row){
      
      if(row != undefined){
        console.log(row)
        if(req.body.password == row.password){
          username = row.username
          age = row.age
          res.redirect('/Basa')
        }
      }else if(req.body.email != ''){
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
  res.render('age_checking.html',{
    username
  });
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
app.get('/Basket', function(req,res){
  db.serialize(function(){
    db.all('SELECT * FROM basket', function(err, row){
      row['username'] = username
      res.render('shop_kit.html',{
        row
      });

    });
  });
});
app.post('/Basket',function(req,res){
  console.log(req.body)
  db.serialize(function(){
    let save = db.prepare('DELETE FROM basket WHERE id = ?', [req.body.id]);
    save.run();
    save.finalize();
  });
  res.redirect('/Basket')
});
app.get('/Favorite', function(req,res){
  res.render('favorites.html',{
    username
  });
});
app.get('/Goods',function(req,res){
  console.log(req.query.id)
  db.serialize(function(){
    db.get('SELECT * FROM goods WHERE id = ?', [req.query.id], function(err,row){
      console.log(row)
      row['username'] = username
      id = row.id;
      res.render('EXAMPLE_BAMBALEYLA_good.html',row);
    });
  });
  
});
app.post('/Goods', function(req,res){

    db.serialize(function(){
      db.get('SELECT * FROM Goods WHERE id = ?', [id], function(err, row){
        console.log(row)
        let save = db.prepare('INSERT INTO basket(id,name,img,price,discount,sell,value,url,age_limit) VALUES (?,?,?,?,?,?,?,?,?)', [row.id, row.name, row.img, row.price, row.discount, row.sell, row.value, row.url, row.age_limit]);
        save.run()
        save.finalize()
      });
    });
    
  
  res.redirect('/Basket')
});
app.use(function(req, res) {
  res.status(404)
  res.render('404.html')
});
app.listen(3000, function() {
  console.log('running');
});