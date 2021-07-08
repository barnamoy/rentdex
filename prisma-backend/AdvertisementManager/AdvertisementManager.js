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
            password: 'password',
            user: "root",
            database: "testitem",
        });
        this.con.connect(function (err) {
            if (err) throw err;
            console.log(" sql db Connected!");
        });
        if (req.query.id === undefined) {
            res.send("null");
            return;
        }
        this.sql = `select i.id,i.name,i.price,i.description,i.imgurl,i.seller,i.category,i.selleremail,s.address,s.rating,s.ratingcount from item i join seller s on i.selleremail=s.email WHERE i.id=${req.query.id}`;
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
        var obj = await this.prisma.item.create({
          data: req.body
        })
        res.send(obj)


    }




}
module.exports = AdvertisementManager