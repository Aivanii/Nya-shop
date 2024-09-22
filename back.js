import express from 'express';
import nunjucks from 'nunjucks';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import sqlite3 from 'sqlite3';
import expressfileupload from 'express-fileupload';
import { mkdir } from 'fs/promises';
import { constants } from 'fs/promises';
import fs from 'fs';
import path from 'path';
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
app.use(express.json());
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
function goods(row,favorite, basket, user){
  let ids;
  let bask;
  // let rew = JSON.parse(row['Reviews_user'])
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
        if(Object.keys(bask[i]) == row.id){
          row['check'] = 'check'
        }
      }
    }
    if(ids.length){
      for(let i = 0; i <= ids.length - 1; i++){
        if(ids[i] == row.id){
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
  row.Reviews_user = JSON.parse(row.Reviews_user)
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
    // let rew = JSON.parse(row[i]['Reviews_user'])
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
      db.all('SELECT * FROM goods', function(err, items) {
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
          for(let i = 0; i <= items.length-1; i++){
            for(let j = 0; j <= discount.length-1; j++){
              if(items[i]['id'] == discount[j]['id']){
                items.splice(i,1)
              }
            }
          }
          res.render('index.html',{discount,items,age,log});                  
        };
      });
    });        
  });
});
app.get('/Basa', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id, username, mail, name, surname, phone, age, id_favorite, id_basket, id_orders, id_reviews FROM user WHERE username = ?', [req.session.username], function(err,row){
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = JSON.parse(row.id_basket).length;
        let orders = JSON.parse(row.id_orders).length;
        let reviews = JSON.parse(row.id_reviews).length;
        if(fs.existsSync('css/img/User/'+row.id + '/'+'iconka.png')){
          row['img'] = `img/User/`+row.id +`/`+ `iconka.png`;
        }else{
          row['img'] = `img/anonym.jpg`;
        }
        row['favorite'] = favorite;   
        row['basket'] = basket;
        row['orders'] = orders;
        row['reviews'] = reviews;
        age = time(row.age);
        res.render('user_page.html', row);
      });
    });
  }else{
    res.redirect('/');
  };
});
app.post('/Log', function(req, res, next) {
  db.serialize(function() {
    db.get('SELECT username, mail, password, age FROM user WHERE mail = ?', [req.body.email], function(err, row) {
      if (row !== undefined) {
        if (req.body.password === row.password) {
          req.session.username = row.username;
          req.session.age = row.age;
          req.session.cena = null;
          res.redirect('/Basa');
        } else {
          res.send('false');
        }
      } else {
        if (req.body.email !== '') {
          db.all('SELECT COUNT(*) AS count FROM user', function(err, rod) {
            let count = rod[0].count;
            count += 1;
            let ids = [];
            const folderName = '../animeshop/css/img/User/' + count;
            const folderPath = path.join(folderName);
            mkdir(folderPath, { recursive: true });
            ids = JSON.stringify(ids);

            let username = 'user' + count;
            db.get('SELECT username FROM user WHERE username = ?', [username], (err, user) => {
              if (!user) {
                let save = db.prepare('INSERT INTO user(id, username, mail, password, id_favorite, id_basket, id_orders, id_reviews) VALUES (?, ?, ?, ?, ?, ?,?,?)', [count, username, req.body.email, req.body.password, ids, ids, ids, ids]);
                save.run();
                save.finalize();
                req.session.username = username;
                req.session.cena = null;
                res.redirect('/Basa');
              } else {
                // Если пользователь с таким именем уже существует, генерируем новое имя
                username = 'user' + (count + 2);
                db.get('SELECT username FROM user WHERE username = ?', [username], (err, user) => {
                  if (!user) {
                    let save = db.prepare('INSERT INTO user(id, username, mail, password, id_favorite, id_basket, id_orders, id_reviews) VALUES (?, ?, ?, ?, ?, ?,?,?)', [count, username, req.body.email, req.body.password, ids, ids, ids, ids]);
                    save.run();
                    save.finalize();
                    req.session.username = username;
                    req.session.cena = null;
                    res.redirect('/Basa');
                  } else {
                    // Если и это имя занято, отправляем ошибку
                    res.send('false');
                  }
                });
              }
            });
          });
        } else {
          res.send('false');
        }
      }
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
      db.get('SELECT id_favorite, id_basket, id_orders, id_reviews FROM user WHERE username = ?', [req.session.username], function(err,row){
        let id = JSON.parse(row.id_basket);
        let favorite = JSON.parse(row.id_favorite).length;
        let orders = JSON.parse(row.id_orders).length;
        let reviews = JSON.parse(row.id_reviews).length;
        let basket = id.length;
        let bag = [];
        let amount = [];
        let text = 'SELECT * FROM goods WHERE id = ';
        if(id.length){
          for(let i = 0 ; i < id.length; i++){ 
              if(i == id.length -1){
                text += `'${Object.keys(id[i])}'`;
              }else{
                text += `'${Object.keys(id[i])}'` + ' OR id = ';
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
            res.render('shop_kit.html',{username: req.session.username,items,basket,favorite,orders,reviews});
          });
        }else{
          res.render('shop_kit.html',{username: req.session.username,favorite,orders, reviews});
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
      db.get('SELECT id_favorite, id_basket, id_orders, id_reviews FROM user WHERE username = ?', [req.session.username], function(err,row){
        let id = JSON.parse(row.id_favorite);
        let favorite = id.length;
        let basket = JSON.parse(row.id_basket).length;
        let orders = JSON.parse(row.id_orders).length;
        let reviews = JSON.parse(row.id_reviews).length;
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
            res.render('favorites.html',{username: req.session.username,item,basket,favorite,orders, reviews});
          });
        }else{
          res.render('favorites.html',{username: req.session.username,basket,orders, reviews});
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
          goods(row, rod.id_favorite, rod.id_basket, req.session.username);
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
app.post('/Basket_pay', function(req,res){
  db.get('SELECT id_basket FROM user WHERE username = ?', [req.session.username],function(err,row){
    if(JSON.parse(row.id_basket).length){
      res.redirect('/Pay')
    }else{
       res.redirect('/Basket')
    }
  }); 
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
app.post('/Basa_update', function(req, res) {
  let now = req.body; 
  db.serialize(function() {
    db.get('SELECT id, mail FROM user WHERE username = ?', [req.session.username], function(err, row) {
      db.all('SELECT Reviews_user FROM goods', function(err,rod){
        for(let i = 0; i <= rod.length-1; i++){
          let fix = JSON.parse(rod[i].Reviews_user);
          for(let j = 0; j <= fix.length-1; j++){
            if(fix[j]['img'] == 'img/anonym.jpg' || fix[j]['img'] == ('img/User/' + row.id + '/iconka.png')){
              fix[j]['user'] = now.nickname;
              fix = JSON.stringify(fix)
              let id = String(i+1).split('');
              while(id.length != 7){
                id.unshift('0')
              }
              id = id.join('')
              let save = db.prepare('UPDATE goods SET Reviews_user = ? WHERE id = ?', [fix,id]);
              save.run();
              save.finalize();
            };
          }; 
        };
      });
      db.all('SELECT username, mail FROM user', function(err, user){
        let x = false;
        for(let i = 0; i <= user.length-1; i++){
          if((user[i]['username'] == now.nickname && user[i]['username'] != req.session.username) || (user[i]['mail'] == now.email && user[i]['mail'] != row.mail)){
            x = true
          }
        }
        if(!x){
          let save = db.prepare('UPDATE user SET username = ?, name = ?, surname = ?, phone = ?, mail = ?, age = ? WHERE id = ?');
          save.run(now.nickname, now.name, now.surname, now.phone, now.email, now.age, row.id, function(err) {
            save.finalize();
            req.session.username = now.nickname;
            res.json({id : x});          
          });
        }else{
          res.json({id : x});
        }        
      });
    });
  });
});
let categories = ["Сумки", "Купальники","Секс куклы", "Тетради", "Блокноты", "Ручки", "Линейки","Фигурки", "Коврики", "Кружки","Накладные ушки", "Ночники", "Зажигалки","Поваренные","Подвески", "Кольца", "Genshin Impact","Чехлы для салфеток"]
app.get('/Catalog', function(req,res){
  db.serialize(function(){
    let text = `SELECT * FROM goods WHERE`;
    let template = [];
    
    if(req.session.value){
      if(req.session.key){ 
        text += ` Category = ?`;
        template.push(req.session.value);    
      }else{
        for(let i = 0; i <= categories.length-1; i++){
          let chet = 0 
          console.log(categories[i])   
          for(let j = 0; j <= req.session.value.length-1; j++){
            if(categories[i][j] == req.session.value[j]){
              chet++;
              console.log(categories[i][j], chet,req.session.value[j])
            }
          }
          if(chet/req.session.value.length * 100 > 50 && text == `SELECT * FROM goods WHERE`){
            text += ` Category = ?`;
            template.push(categories[i]);
            chet = 0
          }
          else if(chet/req.session.value.length * 100 > 50 && text != `SELECT * FROM goods WHERE`){
            text += ` OR Category = ?`;
            template.push(categories[i]);
            chet = 0
          }
        }
        if(text == `SELECT * FROM goods WHERE`){
          text += ` Category = ?`;
          template = [req.session.value];
        }
   
      }
    }
    if(req.session.cena){
      if(req.session.cena['discount'] != 0){
        if(text == `SELECT * FROM goods WHERE`){
          text += ` discount >= ?`
        }else{
          text += ` AND discount >= ?`
        }
        template.push(req.session.cena['discount'])
      }
      if(req.session.cena['rating_4_stars']){
        if(text == `SELECT * FROM goods WHERE`){
          text += ` Rating >= ?`
        }else{
          text += ` AND Rating >= ?`
        }
        template.push(4)
      }
      if(req.session.cena['price_from']){
        if(text == `SELECT * FROM goods WHERE`){
          text += ` price >= ?`
        }else{
          text += ` AND price >= ?`
        }
        template.push(req.session.cena['price_from'])
      }
      if(req.session.cena['price_to'] != 0){
        if(text == `SELECT * FROM goods WHERE`){
          text += ` price <= ?`
        }else{
          text += ` AND price <= ?`
        }
        template.push(req.session.cena['price_to'])
      }
    }
    if(text == `SELECT * FROM goods WHERE`){
      text += ` 1 = ?`;
      template = [1];
    }
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
    let filtir = req.session.cena
    if(req.session.username){
      db.get('SELECT age, id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,rod){
        db.all(text,template, function (err,items){
          items = imgsellaction(items, rod.id_favorite, rod.id_basket, req.session.username);
          let basket = items[2];
          let favorite = items[1];
          items = items[0]; 
          age = time(rod.age);
          res.render('Catalog.html', {username: req.session.username,items,key: req.session.key,value: req.session.value,basket,favorite,age,sorting: req.session.sorting,filtir});
        });
      });             
    }else{
      console.log(text)
      console.log(template)
      db.all(text,template, function (err,items){
        items = imgsellaction(items, null, null, null);
        items = items[0]
        res.render('Catalog.html',{items,age,log,key: req.session.key,value: req.session.value,sorting: req.session.sorting,filtir});
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
app.post('/Filtirpromax',function(req,res){
  req.session.cena = req.body
  res.json({'id': 'хуй'})
});
app.get('/Reviews', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket, id_orders, id_reviews FROM user WHERE username = ?', [req.session.username], function(err,row){
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = JSON.parse(row.id_basket).length;
        let id = JSON.parse(row.id_orders);
        let ids = JSON.parse(row.id_reviews);
        let orders = id.length;
        let x = false
        console.log(orders)
        for(let i = 0; i <= orders-1; i++){
          if(id[i] == req.query.id){
            x = true;
          }
        }
        for(let i = 0; i <= ids.length-1; i++){
          if(ids[i] == req.query.id){
            x = true;
          }
        }
        if(x){
          db.get('SELECT * FROM goods WHERE id = ?',[req.query.id], function(err,items){
            goods(items, row.id_favorite, row.id_basket, req.session.username);
            items['orders'] = orders
            items['reviews'] = ids.length
            if(!items.Reviews_user.length){
              items.Reviews_user.push({'rating': '0'})
            }
            res.render('review_good.html',items);  
          });
        }else{
           res.redirect('/Basa');
        }
      });
    });
  }else{
    res.redirect('/');
  };
});
app.post('/Update_comment', function(req,res){
  if(req.body.value == 'del'){
    db.serialize(function(){
      db.get('SELECT id_orders FROM user WHERE username = ?', [req.session.username], function(err,row){
        let orders = JSON.parse(row.id_orders)
        console.log(req.body.id)
        for(let i = 0; i <= orders.length-1; i++){
          if(orders[i] == req.body.id){
            orders.splice(i,1)
            orders = JSON.stringify(orders);
            let save = db.prepare('UPDATE user SET id_orders = ? WHERE username = ? ', [orders, req.session.username]);
            save.run();
            save.finalize();
            break
          }
        }
        res.send('true')
      });
    });
  }else{
    res.send('false')
  }
});
app.post('/Reviews', function(req,res) {
  const currentDate = new Date();
  let items = req.body;
  items['Data'] = `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
  items.user =  req.session.username;
  let ids = items.id;
  delete items.id;
  db.serialize(function(){
    db.get('SELECT id, id_orders, id_reviews FROM user WHERE username = ?', [req.session.username], function(err,row){
      let orders = JSON.parse(row.id_orders);
      let reviews = JSON.parse(row.id_reviews);
      for(let i = 0; i <= orders.length-1; i++){
        if(orders[i] == ids){
          orders.splice(i,1)
          reviews.push(ids)
          orders = JSON.stringify(orders);
          reviews = JSON.stringify(reviews);
          let save = db.prepare('UPDATE user SET id_orders = ?, id_reviews = ? WHERE username = ? ', [orders, reviews, req.session.username]);
          save.run();
          save.finalize();
          break
        }
      }
      if(fs.existsSync('css/img/User/'+row.id + '/'+'iconka.png')){
        items['img'] = `img/User/`+row.id + `/iconka.png`;
      }else{
        items['img'] = `img/anonym.jpg`;
      }
      db.get('SELECT Reviews_user, Rating, Reviews FROM goods WHERE id = ?',[ids], function(err,item){
        let now = JSON.parse(item.Reviews_user);
        let x = true;  
        for(let i = 0; i <= now.length-1; i++){    
          if(now[i]['img'] === items['img']){
            now[i] = items
            x = false
          }
        }
        if(x){
          now.unshift(items);
        }
        let reviews = item['Reviews'] + 1
        let rating = 0;
        if(now.length){
          for(let i = 0; i <= now.length-1; i++){
            rating += Number(now[i]['rating'])
          }    
        }
        rating =  rating / now.length
        now = JSON.stringify(now);
        let save = db.prepare('UPDATE goods SET Reviews_user = ?, Reviews = ?, Rating = ? WHERE id = ? ', [now, reviews, rating, ids]);
        save.run();
        save.finalize();
        let good = db.prepare('UPDATE user SET id_orders = ?, id_reviews = ? WHERE username = ? ', [ reviews, rating, req.session.username]);
      });
    });
  });
  res.send('true');
});
app.get('/Orders', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket, id_orders, id_reviews FROM user WHERE username = ?', [req.session.username], function(err,row){
        let id = JSON.parse(row.id_orders);
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = JSON.parse(row.id_basket).length;
        let orders = id.length;
        let reviews = JSON.parse(row.id_reviews).length;
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
            res.render('bought-goods.html',{username: req.session.username,item,basket,favorite,orders, reviews});
          });
        }else{
          res.render('bought-goods.html',{username: req.session.username,basket,favorite});
        };
      });
    });
  }else{
    res.redirect('/');
  };
});
app.post('/Orders', function(req,res){
  res.redirect('/Reviews?id='+req.query.id)
});
app.post('/Basaimg', function(req,res){
  db.get('SELECT id, username FROM user WHERE username = ? ', [req.session.username], function(err, row) {
    if(req.files != null){
        req.files.File.name = "iconka.png"
        req.files.File.mv('../animeshop/css/img/User/' + row.id + '/' + req.files.File.name);
        db.all('SELECT Reviews_user FROM goods', function(err,rod){
          for(let i = 0; i <= rod.length-1; i++){
            let fix = JSON.parse(rod[i].Reviews_user);
            for(let j = 0; j <= fix.length-1; j++){
              if(fix[j]['user'] == req.session.username){
                fix[j]['img'] = 'img/User/' + row.id + '/iconka.png';
                fix = JSON.stringify(fix)
                let id = String(i+1).split('');
                while(id.length != 7){
                  id.unshift('0')
                }
                id = id.join('')
                let save = db.prepare('UPDATE goods SET Reviews_user = ? WHERE id = ?', [fix,id]);
                save.run();
                save.finalize();
              }
            };
          }
        });
      }
  });
  res.redirect('/Basa')
});
app.post('/Basaleave',function(req,res){
  req.session.username = null;
  res.send('true');
});
app.get('/Pay', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket, id_orders, mail FROM user WHERE username = ?', [req.session.username], function(err,row){     
        let favorite = JSON.parse(row.id_favorite).length;
        let id = JSON.parse(row.id_basket)
        let basket = id.length;
        let orders = JSON.parse(row.id_orders).length;
        let mail = row.mail
        let bag = [];
        let amount = [];
        let text = `SELECT price, discount FROM goods WHERE id = `;
        if(id.length){

          for(let i = 0 ; i < id.length; i++){ 
            if(i == id.length -1){
              text += `'${Object.keys(id[i])}'`;
            }else{
              text += `'${Object.keys(id[i])}'` + ' OR id = ';
            };
            bag.push(id[i])
          };
          bag.sort(sortAscending);
            for (const obj of bag) {
              amount.push(Object.values(obj)[0]);
            };
          db.all(text, function(err,item){
            let sum = 0;
            amounting(item, amount);
            for(let i = 0; i <= item.length -1; i++){
              if(item[i]['discount']){
                sum += (item[i]['price'] - (item[i]['price'] / 100 * item[i]['discount'])) * item[i]['amount'];
              }else{
                sum += item[i]['price'] * item[i]['amount']
              }
              
            }
            
            let number = Math.floor(Math.random() * 9999998) +1000000
            
            res.render('payment.html',{username: req.session.username,basket,favorite,orders, mail, sum,number});
          });
        }else{
          res.redirect('/Basa');
        }
      });
    });
  }else{
    res.redirect('/');
  };
});
app.get('/Company', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,row){
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = JSON.parse(row.id_basket).length;
        res.render('about_company.html',{basket,favorite});
      });
    });
  }else{
    res.render('about_company.html');
  }
});
app.get('/Career', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,row){
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = JSON.parse(row.id_basket).length;
        res.render('career.html',{basket,favorite});
      });
    });
  }else{
    res.render('career.html');
  }
});
app.get('/Policy', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket FROM user WHERE username = ?', [req.session.username], function(err,row){
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = JSON.parse(row.id_basket).length;
        res.render('policy.html',{basket,favorite});
      });
    });
  }else{
    res.render('policy.html');
  }
});
app.post('/Update_Reviews', function(req,res){
  db.serialize(function(){
    db.get('SELECT id_basket, id_orders FROM user WHERE username = ?',[req.session.username],function(err,row){
      let id = JSON.parse(row.id_basket);
      let basket = Object.keys(id);
      let orders = JSON.parse(row.id_orders);
      for(let i = 0; i <= basket.length-1; i++){
        let x = true;
        for(let j = 0; j <= orders.length-1; j++){
          console.log(orders[j],Object.keys(id[i]))
          if(orders[j] == Object.keys(id[i])){
            x = false;
          };
        };
        if(x){
          let basket = Object.keys(id[i]);
          orders.push(basket[0]);
        };
      };
      id = JSON.stringify([])
      orders = JSON.stringify(orders);
      let save = db.prepare('UPDATE user SET id_orders = ?, id_basket = ? WHERE username = ?',[orders,id,req.session.username]);
      save.run();
      save.finalize();
    });
  });
  res.send({'ok':23})
});
app.get('/Comment', function(req,res){
  if(req.session.username){
    db.serialize(function(){
      db.get('SELECT id_favorite, id_basket, id_orders, id_reviews FROM user WHERE username = ?', [req.session.username], function(err,row){
        let favorite = JSON.parse(row.id_favorite).length;
        let basket = JSON.parse(row.id_basket).length;
        let orders = JSON.parse(row.id_orders).length;
        let reviews = JSON.parse(row.id_reviews).length;
        let id = JSON.parse(row.id_reviews);
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
            res.render('comment_squid.html',{username: req.session.username,item,basket,favorite,orders,reviews});
          });
        }else{
          res.render('comment_squid.html',{username: req.session.username,basket,favorite, orders, reviews});
        };
      });
    });
  }else{
    res.redirect('/');
  };
});
app.get('/Thanks', function(req,res){
  if(req.session.username){
    res.render('Thanks.html',);
  }else{
    res.redirect('/');
  }
});
app.use(function(req, res){
  res.status(404);
  //res.render('404.html');
  res.render('policy.html');
});
app.listen(3000, function(){
  console.log('running');
});