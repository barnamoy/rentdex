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
const AdvertisementManager = require('./AdvertisementManager/AdvertisementManager')



var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  password: 'password',
  user: "root",
  database: "rentdex_db",
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

app.get("/getadvertisementbyid", (req, res) => {
  let ad = new AdvertisementManager()
  ad.getAdvertisementById(req,res)
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
  let ad = new AdvertisementManager()
  ad.addAdvertisement(req,res)
})


app.post("/register", async (req, res) => {

  try {
    let user = await prisma.users.create({
      data: {
        email: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address
      }
    })
    res.send(user);
  }
  finally {
    console.log("done");
  }

});
app.get("/login", (req, res) => {
  username = req.query.username;
  password = req.query.password;

  sql = "SELECT * FROM `users` WHERE email=? and password=?";

  try {
    con.query(sql, [username, password], (err, result) => {
      if (err) throw err;
      else {
        if (result.length == 0) {
          res.statusCode = 400
          res.send(JSON.stringify({ status: "404", msg: "user not valid" }));
          return;
        }
        else {
          result[0].password = password
          data = jwt.sign(
            {
              data: result[0].id,
            },
            "secret",
            { expiresIn: "10h" }
          );
          console.log(data)
          res.send(JSON.stringify({ status: "OK", token: data }))

        }

      }

    });
    // console.log(results ,metadata)
  } finally {
    console.log("done");
  }
});









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