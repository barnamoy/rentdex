var mysql = require("mysql")
var jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client')

class AdvertisementManager {
    constructor(){
        this.prisma = new PrismaClient()
    }
    
    getAdvertisementById(req, res) {
        this.con = mysql.createConnection({
            host: "localhost",
            port: "3306",
            user: "root",
            password : 'password',
            database: "rentdex_db",
        });
        this.con.connect(function (err) {
            if (err) throw err;
            console.log(" sql db Connected!");
        });
        if (req.query.id === undefined) {
            res.send("null");
            return;
        }
        this.sql = `select i.id,i.name,i.price,i.description,i.imgurl,i.maxduration,i.postedby,u.address,u.email from Advertisement i join users u on i.postedby=u.id WHERE i.id=${req.query.id}`;
        this.con.query(this.sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.statusCode = 200
                res.send(result);
            }
        });
    }


    async addAdvertisement(req, res) {
        let id = ""
        jwt.verify(req.headers.authtoken, "secret", (err, decoded) => {
          if (err) console.log(err)
          console.log(decoded.data)
          id = decoded.data
      
        })
        let user = await this.prisma.users.findFirst({
          where: { id: parseInt(id) }
        })
        console.log(user)
        req.body.postedby = user.id;
        req.body.imgurl = req.file.filename
        var obj = await this.prisma.advertisement.create({
          data: req.body
        })
        res.send(obj)


    }
    approveAdvertisement(req,res){
        if(payment){
            return true;

        }
        else{
            return false
        }
    }
    getAllAdvertisement(req ,res){
      this.con = mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password:'password',
        database: "rentdex_db",
    });
    this.con.connect(function (err) {
        if (err) throw err;
        console.log(" sql db Connected!");
    });
        if (req.query.search === "" || req.query.search == undefined) {
            this.con.query("select * from Advertisement", (err, result) => {
              if (err) throw err;
              else {
               
                res.send(result);
              }
            });
          }
          else {
            this.con.query("select * from Advertisement where name LIKE ? OR category LIKE ?", ['%' + req.query.search + '%', '%' + req.query.search + '%'], (err, result) => {
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
    }




}
module.exports = AdvertisementManager