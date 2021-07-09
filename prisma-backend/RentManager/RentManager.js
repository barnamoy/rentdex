var mysql = require("mysql")
var jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client')

class RentManager {

  constructor() {
    this.prisma = new PrismaClient()
  }


  async addRent(req, res) {
    //    console.log(req.body)
    let id = ""
    jwt.verify(req.headers.authtoken, "secret", (err, decoded) => {
      if (err) console.log(err)
      console.log(decoded.data)
      id = decoded.data

    })
    req.body.takerid = id
    req.body.done = false
    var obj = await this.prisma.rent.create({
      data: req.body
    })
    res.send(obj)

  }



  async deleteRent(req, res) {
    let id = ""
    jwt.verify(req.headers.authtoken, "secret", (err, decoded) => {
      if (err) console.log(err)
      console.log(decoded.data)
      id = decoded.data

    })
    req.body.takerid = id
    // req.body.done = false
    var obj = await this.prisma.rent.deleteMany({
      where: {
        rentid: req.body.id
      }
    })
    res.send(obj)

  }
  async editRent() {
    let id = ""
    jwt.verify(req.headers.authtoken, "secret", (err, decoded) => {
      if (err) console.log(err)
      console.log(decoded.data)
      id = decoded.data

    })
    req.body.takerid = id
    // req.body.done = false
    var obj = await this.prisma.rent.updateMany({
      where: req.body.adid,
      data: req.body
    })
    res.send(obj)
  }
  async getRentById(req, res) {
    this.con = mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "password",
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
    var rent = await this.prisma.rent.findMany({
      where: {
        rentid: parseInt(req.query.id),

      }

    })

    res.send(rent)

  }


  async getAllRent(req, res) {

    this.con = mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      password: "password",
      database: "rentdex_db",
    });
    this.con.connect(function (err) {
      if (err) throw err;
      console.log(" sql db Connected!");
    });
    let decodedData
    let authtoken = req.headers.authtoken;
    console.log(authtoken);
    jwt.verify(authtoken, "secret", function (err, decoded) {
      decodedData = decoded.data
      //console.log(decoded.data) // bar
    });
    this.con.query("select a.name,a.price,a.imgurl,r.duration,a.maxduration,a.postedby from Advertisement a join rent r on a.id=r.adid where r.takerid=?", [decodedData], (err, result) => {
      if (err) {
        console.log(err)
      }
      else {

        res.send(result);
      }
    });


  }
  checkDefect() {
    return true

  }

}
module.exports = RentManager