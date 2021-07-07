var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("fs");
var cors = require("cors");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Sequelize, INTEGER } = require("sequelize");
const { PrismaClient } = require('@prisma/client')
const { getPrismaClient } = require('@prisma/client/runtime')
var bodyParser = require('body-parser')
const saltRounds = 10;
const prisma = new PrismaClient()
var mysql = require("mysql");
const { exception } = require("console");




var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  password: 'password',
  user: "root",
  database: "testitem",
});

// const con = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'data.sqlite'
// });

con.connect(function (err) {
  if (err) throw err;
  console.log(" sql db Connected!");
});
var app = express();
var multer = require('multer');
const { parse } = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('here')
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage, limits: { fileSize: 1000 * 1000 } })
// var upload = multer({ dest: 'uploads/' })
app.use(express.static(__dirname + '/uploads'));
app.use(cors());
// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  if (req.query.id === undefined) {
    res.send("null");
    return;
  }
  sql = `select i.id,i.name,i.price,i.description,i.imgurl,i.seller,i.category,i.selleremail,s.address,s.rating,s.ratingcount from item i join seller s on i.selleremail=s.email WHERE i.id=${req.query.id}`;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.statusCode = 200
      res.send(result);
    }
  });
});

app.get("/items", (req, res) => {
  if (req.query.search === "" || req.query.search == undefined) {
    con.query("select * from item", (err, result) => {
      if (err) throw err;
      else {
        authtoken = req.headers.authtoken;
        console.log(authtoken);
        jwt.verify(authtoken, "secret", function (err, decoded) {
          //console.log(decoded.data) // bar
        });
        res.send(result);
      }
    });
  }
  else {
    con.query("select * from item where name LIKE ? OR category LIKE ?", ['%' + req.query.search + '%', '%' + req.query.search + '%'], (err, result) => {
      if (err) {
        console.log(err)
      }
      else {
        authtoken = req.headers.authtoken;
        console.log(authtoken);
        jwt.verify(authtoken, "secret", function (err, decoded) {
          //console.log(decoded.data) // bar
        });
        res.send(result);
      }
    });
  }
});

app.post('/items', upload.single('productimg'), async (req, res, next) => {
  console.log(req)
  var name = req.body.name
  var price = req.body.price
  var description = req.body.description
  var imgurl = "req.file.filename"
  console.log(req.headers.authtoken)
  let id = ""
  jwt.verify(req.headers.authtoken, "secret", (err, decoded) => {
    if (err) console.log(err)
    console.log(decoded.data)
    id = decoded.data

  })
  let seller = await prisma.seller.findFirst({
    where: { id: parseInt(id) }
  })
  console.log(seller)
  req.body.seller = seller.store_name
  req.body.selleremail = seller.email
  req.body.imgurl = req.file.filename
  var obj = await prisma.item.create({
    data: req.body
  })
  res.send(obj)


})


app.get("/register", (req, res) => {
  username = req.query.username;
  password = req.query.password;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    if (err) console.log(err);
    password = hash;
    sql =
      "INSERT INTO `users` (`id`, `name`, `password`) VALUES ('" +
      Math.random() * 10000 +
      "'" +
      "," +
      "'" +
      username +
      "'" +
      "," +
      "'" +
      password +
      "'" +
      ")";
    console.log(sql);
    try {
      con.query(sql, (err, result) => {
        if (err) {
          res.send(JSON.stringify({ status: "404", msg: "error" }));
          throw err;
        } else {
          res.send(JSON.stringify({ status: "200", msg: "done " }));
        }
      });
    } finally {
      console.log("done");
    }
  });
});
app.get("/login", (req, res) => {
  username = req.query.username;
  password = req.query.password;

  sql = "SELECT * FROM `users` WHERE name=" + "'" + username + "'";

  try {
    con.query(sql, (err, result) => {
      if (err) throw err;
      else {
        if (result.length == 0) {
          res.statusCode = 400
          res.send(JSON.stringify({ status: "404", msg: "user not valid" }));
          return;
        }
        bcrypt.compare(password, result[0].password, function (err, docs) {
          if (docs == false) {
            res.statusCode = 400
            res.send(JSON.stringify({ status: "404", msg: "wrong password" }));
            return;
          }
          data = jwt.sign(
            {
              data: result[0].id,
            },
            "secret",
            { expiresIn: "10h" }
          );
          res.statusCode = 200
          res.send(JSON.stringify({ status: "ok", token: data }));
        });
      }
    });
    // console.log(results ,metadata)
  } finally {
    console.log("done");
  }
});
app.get("/addcart", async (req, res) => {
  item = req.query.id;
  var url = req.query.url;
  var number = req.query.number;
  token = req.headers.authtoken;
  var sellerName = req.query.seller
  var selleremail = req.query.selleremail
  var name = req.query.name
  var price = req.query.price

  let user = null;
  console.log('got url for query', url)
  await jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      console.log(err);
    }
    if (decoded.data == undefined) {
      res.send(JSON.stringify({ error: "no auth token" }));
    }
    user = decoded.data;
  });
  done = 0;
  sql =
    "INSERT INTO `cart` (`item`, `number`, `user`, `done` , `url` , `name` , `price`, `seller` , `selleremail`) VALUES (? , ? , ? ,? ,? , ? , ? , ? , ?)"


  try {
    for(let i =0 ; i < number ; i++ ){
    con.query(sql, [item, 1, user, 0, url, name, price, sellerName, selleremail], (err, result) => {
      if (err) {
        console.log(err)
        sql2 = "UPDATE `cart` SET number=number+1 WHERE user=? AND item=?"
        con.query(sql2, [user, item], (err, result) => {
          if (err) {
            console.log(err)
          }
          else {
            console.log('inserted data', result)
          }
        })
      };

      console.log(result);
    });
  }
  res.send(JSON.stringify({"status ":"ok"}));


  } catch(e) {


    console.log("error",e);
  }
});
app.delete('/cart/:id', async (req, res) => {
  let token = req.headers.authtoken;
  let id = req.params.id
  user = null
  await jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      console.log(err);
    }
    if (decoded.data == undefined) {
      res.send(JSON.stringify({ error: "no auth token" }));
    }
    user = decoded.data;
  });
  const cart = await prisma.cart.deleteMany({
    where: {
      id: parseInt(id)
    }
  })
  res.send(cart)
})
app.get("/cart", async (req, res) => {
  token = req.headers.authtoken;
  let user = null;
  //console.log(token)
  await jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      console.log(err);
      res.statusCode = 400
      res.send(JSON.stringify({ "err": "user invalid" }))
      return;
    }
    user = decoded.data;
  });
  if (user == null) {
    return;
  }
  else {
    var cart = await prisma.cart.findMany({
      where: {
        user: user,
        orderNo: 0
      }
    })
    res.send(cart)
  }

});


app.post('/sellerlogin', async (req, res) => {
  let seller = await prisma.seller.findFirst({
    where: req.body
  })
  data = jwt.sign(
    {
      data: seller.id,
    },
    "secret",
    { expiresIn: "10h" }
  );
  console.log(data)
  res.send(JSON.stringify({ status: "OK", token: data, role: "seller" }))
})
app.post('/sellerregister', async (req, res) => {
  console.log(req.body)
  console.log(req.body)
  let seller = await prisma.seller.create({
    data: req.body
  })
  res.send(req.body)
})







app.get('/prisma', async (req, res) => {
  var user = await prisma.seller.findMany()
  res.send(JSON.stringify(user))
})
app.post('/prisma', async (req, res) => {
  try {
    var user = await prisma.con.create({
      data: req.body
    })
  }
  catch (err) {
    console.log("there is an error " + err)
    res.statusCode = 400
    res.send('error')
  }


  res.send(JSON.stringify(user))
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});



app.listen(4000, () => { console.log('server is running on 4000 ') })

module.exports = app