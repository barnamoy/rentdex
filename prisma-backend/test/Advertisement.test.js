let chai = require("chai");
let chaiHttp = require("chai-http");
const mysql = require('mysql')
let server = require("./../app");
const fs = require('fs')
var jwt = require("jsonwebtoken");
const { time } = require("console");



var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "rentdex_db",
});


con.connect(function (err) {
    if (err) throw err;
    console.log(" sql db Connected!");
});


//Assertion Style
chai.should();
var expect = chai.expect;

chai.use(chaiHttp);
let token_test = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjozLCJpYXQiOjE2MjU4NDQwODksImV4cCI6MTYyNTg4MDA4OX0.MvkXh2Ahws0yxlMk7I6P-IgfJHr1nKbvbev-EbjDp7s"
describe('RentDex API', () => {
    describe("POST /items", () => {
        it("It should post an advertisement", (done) => {
            let cusname = "water form test" + Date.now()
            chai.request(server).post("/items").attach('productimg', fs.readFileSync('./test/water.jpg'), 'water.jpg')
                .field({
                    "name": cusname,
                    "price": "500",
                    "description": "pure",
                    "maxduration": 5
                }).set({ 'authtoken': token_test })
                .end((err, response) => {
                    response.should.have.status(200);
                    const obj = response.body
                    obj.should.be.a('object');


                    let id = ""
                    jwt.verify(token_test, "secret", (err, decoded) => {
                        if (err) console.log(err)
                        console.log(decoded.data)
                        id = decoded.data

                    })
                    con.query('select * from Advertisement where postedby=? and name=? and price="500" and description="pure" and maxduration=5', [parseInt(id), cusname], (err, result) => {
                        if (err)
                            console.log(err)
                        else {

                            expect(result.length).to.equal(1);
                            expect(result[0].postedby).to.equal(parseInt(id));
                        }
                    })

                    done()
                });
        });


    });


    describe("GET /getadvertisementbyid", () => {
        it("It should get the details of particular item", (done) => {
            chai.request(server).get("/getadvertisementbyid?id=1").end((err, response) => {
                response.should.have.status(200);
                const obj = response.body[0]
                obj.should.be.a('object');
                let sql = `select i.id,i.name,i.price,i.description,i.imgurl,i.maxduration,i.postedby,u.address,u.email from Advertisement i join users u on i.postedby=u.id WHERE i.id=1`;
                con.query(sql, (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        expect(obj).to.deep.equal(result[0]);
                    }
                })

                done();
            });
        });
    });


    describe("GET /items", () => {
        it("It should get all the items", (done) => {
            chai.request(server).get("/items").end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                const obj = response.body[0]
                obj.should.be.a('object');

                con.query("select * from Advertisement", (err, result) => {
                    if (err)
                        console.log(err)
                    else {
                        expect(result.length).to.equal(response.body.length);
                        var sortedobj = response.body.slice(0);
                        sortedobj.sort(function (a, b) {
                            return a.id - b.id;
                        });
                        
                        var sortedresult = result.slice(0);
                        sortedresult.sort(function (a, b) {
                            return a.id - b.id;
                        });

                        

                        for (let i = 0; i < result.length; i++) {
                            console.log('tested for ',i)
                            expect(sortedobj[i]).to.deep.equal(sortedresult[i])
                        }
                    }
                })

                done();
            });
        });
    });







});