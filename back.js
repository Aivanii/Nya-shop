import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import sqlite3 from 'sqlite3';
import expressfileupload from 'express-fileupload';
let app = express();
let  router = express.Router();
app.use(expressfileupload({safeFileNames: true, preserveExtension: true }));
app.use(bodyParser.urlencoded({extended: true}));
nunjucks.configure('html', {
  autoescape:  true,
  express:  app
});
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
function sortAscending(a, b) {
  let keyA = Object.keys(a)[0];
  let keyB = Object.keys(b)[0];
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
};
function amounting(row, amount){
  for(let i = 0; i <= row.length-1; i++){
    row[i]['amount'] = amount[i];
  };
};
function time(past){
  let now = new Date();
  past = new Date(past);
  return age = (now-past)/31536000000;
}
function goods(row,favorite, basket, user, id){
  let ids;
  let bask;
  if(user){
    ids = JSON.parse(favorite);
    favorite = ids.length;
    bask = JSON.parse(basket);
    basket = bask.length;
    row['username'] = user;
    row['favorite'] = favorite;
    row['basket'] = basket;
    if(bask.length){
      for(let i = 0; i <= bask.length - 1; i++){
        if(Object.keys(bask[i]) == id){
          row['check'] = 'check'
        }
      }
    }
    if(ids.length){
      for(let i = 0; i <= ids.length - 1; i++){
        if(ids[i] == id){
          row['action'] = "action";
        };
      };
    };
  }else{
    row['log'] = log;
  };
  if(row['discount']){
    row['sell'] = row['price'] - (row['price'] / 100 * row['discount']);
  };
  let items = JSON.parse(row.characteristics);
  row['characteristics'] = items;
  items = JSON.parse(row.img);
  row['img'] = items;
};
function imgsellaction(row, favorite, basket, user){  
  let id;
  if(user){
    id = JSON.parse(favorite);
    basket = JSON.parse(basket).length;
    favorite = id.length;
  };
  for(let i = 0; i <= row.length-1; i++){
    let item = JSON.parse(row[i]['img']);
    row[i]['img'] = item[0];
    if(row[i]['discount']){

      row[i]['sell'] = row[i]['price'] - (row[i]['price'] / 100 * row[i]['discount']);
    };
    if(row[i]['amount']){
      rod[i]['amount'] = amount[i];
    };
    if(user){
      for(let j = 0; j <= id.length -1;j++){                
        if(row[i]['id'] == id[j]){
          row[i]['action'] = "action";
        };
      };
    };
  };
  return [row, favorite, basket];
};
function favor(id, favorite, y){
  let x = true;
  favorite = JSON.parse(favorite);
  if(favorite != null){
    for(let i = 0; i <= favorite.length - 1; i++){
      if(favorite[i] == id){
        favorite.splice(i,1);
        console.log(favorite);
        x = false;
      };
    };
  };
  if(y = 1){
    if(x == true){ 
      favorite.push(id);
    };
  };
  return favorite;
};
app.get('/', function(req,res){
  let text;
  db.serialize(function() {
    db.all('SELECT * FROM goods WHERE discount IS NOT NULL ORDER BY discount DESC LIMIT 12;', function(err, discount) {
      db.all('SELECT * FROM goods WHERE discount IS NULL', function(err, items) {
        if(req.session.username){
          db.get('SELECT age, id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,rod){
            age = time(rod.age);
            discount = imgsellaction(discount, rod.id_favorite, rod.id_basket, req.session.username);
            let basket = discount[2];
            let favorite = discount[1];
            discount = discount[0]; 
            imgsellaction(items, rod.id_favorite, rod.id_basket, req.session.username);
            res.render('index.html',{discount,items,age,username: req.session.username,basket,favorite});
          });
        }else{
          imgsellaction(discount, null, null, null);
          imgsellaction(items, null, null, null);
          res.render('index.html',{discount,items,age,log});                  
        };
      });
    });        
  });
});
app.get('/Basa', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT username, mail, name, surname, phone, age, id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,row){
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = JSON.parse(row.id_basket).length;
        row['favorite'] = favorite;   
        row['basket'] = basket;
        age = time(row.age);
        res.render('user_page.html', row);
      });
    });
  }else{
    res.redirect('/');
  };
});
app.post('/Log', function(req,res,next){
  db.serialize(function() {
    db.get('SELECT username, mail, password, age FROM user WHERE mail = ?', [req.body.email], function(err,row){ 
      if(row != undefined){
        if(req.body.password == row.password){
          req.session.username = row.username;
          age = row.age;
          res.redirect('/Basa');
        }else{
          res.send('false');
        };
      }else{
        if(req.body.email != ''){
          db.all('SELECT COUNT(*) FROM user', function(err,rod){
            let y = rod[0];
            y = y['COUNT(*)'];
            y += 1;
            let ids = [];
            ids = JSON.stringify(ids);
            req.session.username = 'user' + y
            let save = db.prepare('INSERT INTO user(id, username, mail, password, id_favorite, id_basket) VALUES (?, ?, ?, ?, ?, ?)', [y, req.session.username, req.body.email, req.body.password, ids, ids]);
            save.run();
            save.finalize();
            res.redirect('/Basa');
          });
        }else{
          res.send('false');
        };
      };
    });
  });
});
app.get('/Age', function(req,res){
  id = req.query.id;
  res.render('age_checking.html',{username: req.session.username});
});
app.post('/Age', function(req,res){
  age = time(req.body.DOB);
  if(req.session.username){
    db.serialize(function(){
      let save = db.prepare('INSERT INTO user(age) VALUES (?) WHERE username = ?', [req.body.DOB, req.session.username]);
      save.run();
      save.finalize();
    });
  };  
  if(age >= 18){
    let text = '/Goods?id='+id;
    res.redirect(text);
  }else{
    res.redirect('/');
  };
  
});
app.get('/Basket', function(req,res){
  if(req.session.username){
    let username = req.session.username;
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,row){
        let id = JSON.parse(row.id_basket);
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = id.length;
        let bag = [];
        let amount = [];
        let text = 'SELECT * FROM goods WHERE id = ';
        if(id.length){
          for(let i = 0 ; i < id.length; i++){ 
              if(i == id.length -1){
                if(text == undefined){
                  text = `'${Object.keys(id[i])}'`;
                }else{
                  text += `'${Object.keys(id[i])}'`;
                };  
              }else{
                if(text == undefined){
                  text = `'${Object.keys(id[i])}'` + ' OR id = ';
                }else{
                  text += `'${Object.keys(id[i])}'` + ' OR id = ';
                }; 
             };
            bag.push(id[i])
          };
          bag.sort(sortAscending);
          for (const obj of bag) {
              amount.push(Object.values(obj)[0]);
          };
          db.all(text, function(err,items){
            imgsellaction(items, null, null, null);
            amounting(items, amount);
            res.render('shop_kit.html',{username: req.session.username,items,basket,favorite,});
          });
        }else{
          res.render('shop_kit.html',{username: req.session.username,favorite,});
        };
      });
    });
  }else{
    res.redirect('/');
  };
});
app.get('/Favorite', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,row){
        let id = JSON.parse(row.id_favorite);
        let favorite = id.length;
        let basket = JSON.parse(row.id_basket).length;
        let text = 'SELECT * FROM goods WHERE id = ';
        if(id.length){
          for(let i = 0 ; i < id.length; i++){      
            if(i == id.length -1){
              if(text == undefined){
                text = `'${id[i]}'`;
              }else{
                text += `'${id[i]}'`;
              };              
            }else{
              if(text == undefined){
                text = `'${id[i]}'` + ' OR id = ';
              }else{
                text += `'${id[i]}'` + ' OR id = ';
              };
            };
          };
          db.all(text, function(err,item){
            imgsellaction(item, null, null, null);
            res.render('favorites.html',{username: req.session.username,item,basket,favorite,});
          });
        }else{
          res.render('favorites.html',{username: req.session.username,basket,});
        };
      });
    });
  }else{
    res.redirect('/');
  };
});
app.get('/Goods',function(req,res){
  db.serialize(function(){
    db.get('SELECT * FROM goods WHERE id = ?', [req.query.id], function(err,row){
      if(req.session.username){
        db.get('SELECT id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,rod){
          goods(row, rod.id_favorite, rod.id_basket, req.session.username, req.query.id);

          res.render('EXAMPLE_BAMBALEYLA_good.html',row);
        });        
      }else{ 
        goods(row,null,null,null, req.query.id);
        res.render('EXAMPLE_BAMBALEYLA_good.html',row);
      };
    });
  });
});
app.post('/Goods', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_basket FROM user WHERE username = ?', [req.session.username], function(err, row){

        let now = JSON.parse(row.id_basket);
        if(req.body.value == 'ins'){
          if(!now.length){
            now = [];
            let newObject = {};
            newObject[req.body.id] = 1;
            now.push(newObject);
            now = JSON.stringify(now);
            let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,req.session.username]);
            save.run();
            save.finalize();
            res.redirect('/Basket');
          }else{
            let x = true;
            for(let i = 0; i <= now.length-1; i++){
              if(Object.keys(now[i])[0] == req.body.id){    
                x = false;
                now[i][req.body.id] += 1;
              };
            };
            if(x){
                let newObject = {};
                newObject[req.body.id] = 1;
                now.push(newObject); 
              };
            now = JSON.stringify(now);
            let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,req.session.username]);
            save.run();
            save.finalize()
            res.redirect('/Basket'); 
          };
        }else{
          for(let i = 0; i <= now.length-1; i++){
            if(req.body.id == Object.keys(now[i]))
              now.splice(i, 1);
          }
          now = JSON.stringify(now);
          let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,req.session.username]);
          save.run();
          save.finalize()
          res.send('del')
        }      
      });
    });
  };
});
app.post('/Favor',function(req,res){
  db.serialize(function(){
    db.get('SELECT id_favorite FROM user WHERE username = ?', [req.session.username], function(err,row){
      let favorite = favor(req.body.id, row.id_favorite, 1);
      let after = favorite;
      favorite = JSON.stringify(favorite);
      let save = db.prepare('UPDATE user SET id_favorite = ? WHERE username = ? ', [favorite,req.session.username]);
      save.run();
      save.finalize();
      res.send({ some: after.length });
    });
  });
});
app.post('/Favorite',function(req,res){
  db.serialize(function(){
    db.get('SELECT id_favorite FROM user WHERE username = ?', [req.session.username], function(err,row){
      let favorite = favor(req.body.id, row.id_favorite, 0);
      favorite = JSON.stringify(favorite);
      let save = db.prepare('UPDATE user SET id_favorite = ? WHERE username = ? ', [favorite,req.session.username]);
      save.run();
      save.finalize();
      res.redirect('/Favorite');
    });
  });
});
app.post('/Basket',function(req,res){
  db.serialize(function(){
    db.get('SELECT id_basket FROM user WHERE username = ?', [req.session.username], function(err, row){
      let now = JSON.parse(row.id_basket); 
      for(let i = 0; i < now.length; i++){
        if(Object.keys(now[i])[0] == req.body.id){
          now.splice(i,1);
        };
      };
      now = JSON.stringify(now);
      let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,req.session.username]);
      save.run();
      save.finalize();
    });
  });
  res.redirect('/Basket');
});
app.post('/Favor_basket', function(req,res){
  db.serialize(function(){
    db.get('SELECT id_basket FROM user WHERE username = ?', [req.session.username], function(err, row){
      let now = JSON.parse(row.id_basket);
      if(!now.length){
        now = [];
        let newObject = {};
        newObject[req.body.id] = 1;
        now.push(newObject);
        now = JSON.stringify(now);
        let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,req.session.username]);
        save.run();
        save.finalize()
        res.redirect('/Basket');
      }else{
        let x = true;
        for(let i = 0; i <= now.length-1; i++){
          if(Object.keys(now[i])[0] == req.body.id){    
            x = false;
            now[i][req.body.id] += 1;
          };
        };
        if(x){
          let newObject = {};
          newObject[req.body.id] = 1;
          now.push(newObject);     
        };
        now = JSON.stringify(now);
        let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [now,req.session.username]);
        save.run();
        save.finalize();
        res.redirect('/Basket');
      };      
    });
  });
});
app.post('/Basa_update', function(req,res){
  let text = 'UPDATE user SET ';
  let update;
  let username;
  if(req.body.nick){
    text += 'username = ';
    update = req.body.nick;
    username = req.session.username;
    req.session.username = req.body.nick;
  }else if(req.body.name){
    text += 'name = ';
    update = req.body.name;
  }else if(req.body.surname){
    text += 'surname = ';
    update = req.body.surname;
  }else if(req.body.phone){
    text += 'phone = ';
    update = req.body.phone;
  }else if(req.body.email){
    text += 'mail = ';
    update = req.body.email;
  }else{
    text += 'age = ';
    update = req.body.age; 
  };
  if(req.session.username != req.body.nick){
    username = req.session.username;
  };
  text += '? WHERE username = ?';
  db.serialize(function(){
    let save = db.prepare(text, [update,username]);
    save.run();
    save.finalize();
  });
  res.send('true');
});
app.get('/Catalog', function(req,res){
  db.serialize(function(){
    let items
    let text;
    let value;
    let template;
    if(req.session.username){
      db.get('SELECT age, id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,rod){
        if(req.session.value){
          if(req.session.key){ 
              text = `SELECT * FROM goods WHERE Category = ?`;
              template = [req.session.value];    
          }else{
            text = `SELECT * FROM goods WHERE SUBSTRING(name,1,?) = ?`;
            template = [req.session.value.length,req.session.value];    
          };
        }else{
          text = `SELECT * FROM goods WHERE 1 = ?`;
          template = [1];
        };
        if(req.session.sorting == undefined || req.session.sorting == 1){
          req.session.sorting = 1
          text += ` ORDER BY (Rating + Reviews) DESC;`
        }else if(req.session.sorting == 2){
          text += ` ORDER BY Rating DESC;`
        }else if(req.session.sorting == 3){
          text += ` ORDER BY price ASC;`
        }else{
          text += ` ORDER BY price DESC;`
        }
        db.all(text,template, function (err,items){
          items = imgsellaction(items, rod.id_favorite, rod.id_basket, req.session.username);
          let basket = items[2];
          let favorite = items[1];
          items = items[0]; 
          age = time(rod.age);

          res.render('Catalog.html', {username: req.session.username,items,key: req.session.key,value: req.session.value,basket,favorite,age,sorting: req.session.sorting});
        });
      });             
    }else{
      if(req.session.value){
        if(req.session.key){
          text = `SELECT * FROM goods WHERE category = ?`;
          template = [req.session.value];   
        }else{
          text = `SELECT * FROM goods WHERE SUBSTRING(name,1,?) = ?`;
          template = [req.session.value.length,req.session.value];
        }
      }else{
        text = `SELECT * FROM goods WHERE 1 = ?`;
        template = [1];        
      };
      if(req.session.sorting == undefined || req.session.sorting == 1){
        req.session.sorting = 1
        text += ` ORDER BY (Rating + Reviews) DESC;`
      }else if(req.session.sorting == 2){
        text += ` ORDER BY Rating DESC;`
      }else if(req.session.sorting == 3){
        text += ` ORDER BY price ASC;`
      }else{
        text += ` ORDER BY price DESC;`
      }
      db.all(text,template, function (err,items){
        items = imgsellaction(items, null, null, null);
        items = items[0]
        res.render('Catalog.html',{items,age,log,key: req.session.key,value: req.session.value,sorting: req.session.sorting});
      }); 
    };
  });
})
app.post('/Go_to_catalog', function(req,res){
  req.session.key = req.body.divValue;
  req.session.value = req.body.liValue;
  res.redirect('/Catalog');
});
app.post('/Search', function(req,res){
  req.session.value = req.body.input_obj;
  req.session.value = req.session.value.charAt(0).toUpperCase() + req.session.value.slice(1);
  req.session.key = null;
  res.redirect('/Catalog');
});
app.post('/Amount', function(req,res){
  db.serialize(function(){
    db.get('SELECT id_basket FROM user WHERE username = ?', [req.session.username], function(err,row){
      let item = JSON.parse(row['id_basket']);
      for(let i = 0; i <= item.length-1; i++){
        if(Object.keys(item[i]) == req.body.id){
          item[i][req.body.id] = Number(req.body.amount);
        }
      }
      item = JSON.stringify(item);
      let save = db.prepare('UPDATE user SET id_basket = ? WHERE username = ? ', [item,req.session.username]);
      save.run();
      save.finalize();
    });
  });
  res.send('true');
});
app.post('/Filtirspisok', function(req,res){
  req.session.sorting = req.body.ids
  res.send('true')
});
app.get('/Reviews', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,row){
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = JSON.parse(row.id_basket).length;
        res.render('review_good.html',{username: req.session.username,basket,favorite});
      });
    });
  }else{
    res.redirect('/');
  };
});
app.use(function(req, res){
  res.status(404);
  res.render('404.html');
});
app.listen(3000, function(){
  console.log('running');
});
