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
let id = null;
let log = `data-bs-toggle=modal data-bs-target=#logining_window`;
let secret = 'qwerty';
app.use(expressSession({
  secret: secret,
}));
app.use(express.static('css'));
var db = new sqlite3.Database('anime.db');
let error;
app.get('/', function(req,res){
  let items;
  if(username){
    db.serialize(function() {
      db.all('SELECT * FROM goods WHERE discount IS NOT NULL', function(err, row) {
          db.get('SELECT age, id_favorite FROM user WHERE username = ?', [username], function(err,rod){
            age = rod.age
            for(let i = 0; i <= row.length-1; i++){
              let id = JSON.parse(rod.id_favorite)
              for(let j = 0; j <= id.length -1;j++){                
                if(row[i]['id'] == id[j]){
                  row[i]['action'] = "action"
                }
              }
            }
            for(let i = 0; i <= row.length-1; i++){
              let item = JSON.parse(row[i]['img'])
              row[i]['img'] = item[0]
            }
            items = row
            res.render('index.html',{
              items,
              age,
              username
            }); 
          })         
      });
    });
  }else{
    db.serialize(function() {
      db.all('SELECT * FROM goods WHERE discount IS NOT NULL', function(err, row) {
        console.log()
        for(let i = 0; i <= row.length-1; i++){
          let item = JSON.parse(row[i]['img'])
          row[i]['img'] = item[0]
        }
        items = row
        res.render('index.html',{
          items,
          age,
          username,
          log
        }); 
      });
    });
  }        
});
app.get('/Basa', function(req,res){
  
  db.serialize(function(){
    db.get('SELECT username, mail, name, surname FROM user WHERE username = ?', [username], function(err,row){
      res.render('user_page.html', row);
    });
  });
  });
app.post('/Log', function(req,res,next){
  console.log(req.body)
  db.serialize(function() {
    db.get('SELECT username, mail, password, age FROM user WHERE mail = ?', [req.body.email], function(err,row){
      
      if(row != undefined){
        console.log(row)
        if(req.body.password == row.password){
          username = row.username
          age = row.age
          res.redirect('/Basa')
        }else{
          res.send('false')
        }
      }else{
        if(req.body.email != ''){
          db.all('SELECT COUNT(*) FROM user', function(err,rod){
            let y = rod[0];
            y = y['COUNT(*)']
            y += 1
            let ids = []
            let now = []
            ids = JSON.stringify(ids);
            now = JSON.stringify(now);
            console.log(ids, now)
            username = 'user' + y
            let save = db.prepare('INSERT INTO user(id, username, mail, password, id_favorite, id_basket) VALUES (?, ?, ?, ?, ?, ?)', [y, username, req.body.email, req.body.password, ids, now]);
            save.run();
            save.finalize();
            res.redirect('/Basa')

          });
        }else{
          res.send('false')
        }
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
app.get('/Basket', function(req,res){
  db.serialize(function(){
    db.get('SELECT id_basket FROM user WHERE username = ?', [username], function(err,row){
      let id = JSON.parse(row.id_basket)
      let items;
      let text = 'SELECT * FROM goods WHERE id = ';
      if(id.length){
        for(let i = 0 ; i < id.length; i++){
          
            if(i == id.length -1){
              if(text == undefined){
                text = `'${id[i]}'`
              }else{
                text += `'${id[i]}'`
              }
              
            }else{
              if(text == undefined){
                text = `'${id[i]}'` + ' OR id = '
              }else{
                text += `'${id[i]}'` + ' OR id = ' 
              }
            
           }
        }
      }
      db.all(text, function(err,rod){
        for(let i = 0; i <= rod.length-1; i++){
              let items = JSON.parse(rod[i]['img'])
              rod[i]['img'] = items[0]
            }
        items = rod
        res.render('shop_kit.html',{
          username,
          items,
        });
      });
    });
  });
});

app.get('/Favorite', function(req,res){
  db.serialize(function(){
    db.get('SELECT id_favorite FROM user WHERE username = ?', [username], function(err,row){
      let id = JSON.parse(row.id_favorite)
      let item;
      let text = 'SELECT * FROM goods WHERE id = ';
      if(id.length){
        for(let i = 0 ; i < id.length; i++){
        
          if(i == id.length -1){
            if(text == undefined){
              text = `'${id[i]}'`
            }else{
              text += `'${id[i]}'`
            }
            
          }else{
            if(text == undefined){
              text = `'${id[i]}'` + ' OR id = '
            }else{
              text += `'${id[i]}'` + ' OR id = ' 
            }
          
          }
        }
      }
      
      db.all(text, function(err,rod){
        for(let i = 0; i <= rod.length-1; i++){
              let items = JSON.parse(rod[i]['img'])
              rod[i]['img'] = items[0]
            }
        item = rod
        res.render('favorites.html',{
          username,
          item,
        });

      });
    });
  });
});
app.get('/Goods',function(req,res){
  if(username){
    db.serialize(function(){
      db.get('SELECT * FROM goods WHERE id = ?', [req.query.id], function(err,row){
        db.get('SELECT id_favorite FROM user WHERE username = ?', [username], function(err,rod){
          let ids = JSON.parse(rod.id_favorite);

          if(ids.length){
            for(let i = 0; i <= ids.length - 1; i++){
              if(ids[i] == req.query.id){
                row['action'] = "action"
                console.log(row)
                break
                
              }
            }
          }
          let items = JSON.parse(row.characteristics)
          row['characteristics'] = items
          items = JSON.parse(row.img)
          row['img'] = items
          row['username'] = username  
          res.render('EXAMPLE_BAMBALEYLA_good.html',row);
        });
      });
    });
  }else{
    db.serialize(function(){
      db.get('SELECT * FROM goods WHERE id = ?', [req.query.id], function(err,row){
        let items = JSON.parse(row.characteristics)
        row['characteristics'] = items
        items = JSON.parse(row.img)
        row['img'] = items
        row['log'] = log
        res.render('EXAMPLE_BAMBALEYLA_good.html',row);
      });
    });
  }
  
  
});
app.post('/Goods', function(req,res){
  if(username){
    db.serialize(function(){
      db.get('SELECT id_basket FROM user WHERE username = ?', [username], function(err, row){
        let now = JSON.parse(row.id_basket)
        if(!now.length){
          now = []
          now.push(req.body.id)
          now = JSON.stringify(now)
          let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,username]);
          save.run();
          save.finalize()
          res.redirect('/Basket')
        }else{
          let x = true
          for(let i = 0; i < now.length; i++){
            if(now[i] == id)
              x = false
              break
          }
          if(x){
              console.log(req.body.id)
              now.push(req.body.id)
              now = JSON.stringify(now)
              let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,username]);
              save.run();
              save.finalize()
            }
          res.redirect('/Basket') 
        }      
      });
    });
  }
});
app.post('/Favor',function(req,res){
  let favorite = req.body.id;
  let x = true
  db.serialize(function(){
    db.get('SELECT id_favorite FROM user WHERE username = ?', [username], function(err,row){
      let id = JSON.parse(row.id_favorite);
      if(id != null){
        for(let i = 0; i <= id.length - 1; i++){
          if(id[i] == favorite){
            id.splice(i,1)
            x = false
          }
        }
      }else
        if(id == null){
          id = []
        }
        if(x == true){ 
          id.push(favorite);
    
        }
      id = JSON.stringify(id)
      let save = db.prepare('UPDATE user SET id_favorite = ? WHERE username = ? ', [id,username]);
      save.run();
      save.finalize()
    });
  });
  res.send('true')
});

app.post('/Favorite',function(req,res){
  let favorite = req.body.id;
  let x = true
  db.serialize(function(){
    db.get('SELECT id_favorite FROM user WHERE username = ?', [username], function(err,row){
      let id = JSON.parse(row.id_favorite);
      if(id.length){
        for(let i = 0; i <= id.length - 1; i++){
          if(id[i] == favorite){
              id.splice(i,1)
              x = false
          }
        }
      }else
        if(id == null){
          id = []
        }
        if(x == true){ 
          id.push(favorite);
        }
      id = JSON.stringify(id)
      let save = db.prepare('UPDATE user SET id_favorite = ? WHERE username = ? ', [id,username]);
      save.run();
      save.finalize();
      res.redirect('/Favorite');
    });
  });
});
app.post('/Basket',function(req,res){
  db.serialize(function(){
    db.get('SELECT id_basket FROM user WHERE username = ?', [username], function(err, row){
      let now = JSON.parse(row.id_basket) 
      for(let i = 0; i < now.length; i++){
        if(now[i] == req.body.id){
          now.splice(i,1)
        }
      } 
      now = JSON.stringify(now)
      let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,username]);
      save.run();
      save.finalize()
    });
  });
  res.redirect('/Basket')
});
app.post('/Favor_basket', function(req,res){
  db.serialize(function(){
    db.get('SELECT id_basket FROM user WHERE username = ?', [username], function(err, row){
      let now = JSON.parse(row.id_basket)
      if(now == null){
        now = []
      }
      now.push(req.body.id) 
      now = JSON.stringify(now)
      let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,username]);
      save.run();
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