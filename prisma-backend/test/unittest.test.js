let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./../app");
const fs = require('fs')
//Assertion Style
chai.should();

chai.use(chaiHttp);
let token_test="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjozLCJpYXQiOjE2MjU4NDQwODksImV4cCI6MTYyNTg4MDA4OX0.MvkXh2Ahws0yxlMk7I6P-IgfJHr1nKbvbev-EbjDp7s"
describe('RentDex API', () => {

    describe("GET /login", () => {
        it("Login Test", (done) => {
            chai.request(server)
                .get("/login?username=test3&password=123")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    console.log(response.body)
                    // response.body.should.have.property('error');


                    done();
                });
        });
    });


    describe("GET /getadvertisementbyid", () => {
        it("It should get the details of particular item", (done) => {
            chai.request(server).get("/getadvertisementbyid?id=1").end((err, response) => {
                response.should.have.status(200);
                const obj = response.body[0]
                obj.should.be.a('object');
                obj.should.have.property('id');
                obj.should.have.property('name');
                obj.should.have.property('price');
                obj.should.have.property('description');
                obj.should.have.property('imgurl');
                obj.should.have.property('maxduration');
                obj.should.have.property('postedby');
                obj.should.have.property('address');
                obj.should.have.property('email');

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
                obj.should.have.property('id');
                obj.should.have.property('name');
                obj.should.have.property('price');
                obj.should.have.property('description');
                obj.should.have.property('imgurl');
                obj.should.have.property('maxduration');
                obj.should.have.property('postedby');

                done();
            });
        });
    });


    describe("GET /getallrent", () => {
        it("It should get all the items rented by a particular user", (done) => {
            chai.request(server).get("/getallrent").set('authtoken', token_test).end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                const obj = response.body[0]
                obj.should.be.a('object');
                obj.should.have.property('name');
                obj.should.have.property('price');
                obj.should.have.property('imgurl');
                obj.should.have.property('duration');
                obj.should.have.property('maxduration');
                obj.should.have.property('postedby');



                done();
            });
        });




    });


    describe("GET /getrentbyid", () => {
        it("It should get all the rented items by id", (done) => {
            chai.request(server).get("/getrentbyid?id=2").end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                const obj = response.body[0]
                obj.should.be.a('object');
                obj.should.have.property('rentid');
                obj.should.have.property('giverid');
                obj.should.have.property('takerid');
                obj.should.have.property('duration');
                obj.should.have.property('adid');
                obj.should.have.property('done');



                done();
            });
        });




    });

    describe("POST /register", () => {
        it("It should register a user", (done) => {
            chai.request(server).post("/register").send({
                "address": "bankra",
                "password": "123",
                "password_conf": "123",
                "phone": "12345",
                "username": "test4"
            }).end((err, response) => {
                response.should.have.status(200);
                const obj = response.body
                obj.should.be.a('object');
                obj.should.have.property('id');
                obj.should.have.property('email');
                obj.should.have.property('password');
                obj.should.have.property('phone');
                obj.should.have.property('address');
                obj.should.have.property('type');




                done();
            });
        });




    });
    describe("POST /addrent", () => {
        it("It should add a rent", (done) => {
            chai.request(server).post("/addrent").send({
                "adid": 4,
                "duration": 57,
                "giverid": 1
            }).set({ 'authtoken': token_test })
                .end((err, response) => {
                    response.should.have.status(200);
                    const obj = response.body
                    obj.should.be.a('object');
                    obj.should.have.property('rentid');
                    obj.should.have.property('giverid');
                    obj.should.have.property('takerid');
                    obj.should.have.property('duration');
                    obj.should.have.property('adid');
                    obj.should.have.property('done');



                    done()
                });
        });



    });


    describe("POST /items", () => {
        it("It should post an advertisement", (done) => {
            chai.request(server).post("/items").attach('productimg', fs.readFileSync('./test/water.jpg'), 'water.jpg')
                .field({
                    "name": "water form test",
                    "price": "500",
                    "description": "pure",
                    "maxduration": 5
                }).set({ 'authtoken': token_test })
                .end((err, response) => {
                    response.should.have.status(200);
                    const obj = response.body
                    obj.should.be.a('object');
                    obj.should.have.property('id');
                    obj.should.have.property('name');
                    obj.should.have.property('price');
                    obj.should.have.property('description');
                    obj.should.have.property('imgurl');
                    obj.should.have.property('maxduration');
                    obj.should.have.property('postedby');



                    done()
                });
        });



    });

    describe("POST /payment", () => {
        it("It should add a payment fee", (done) => {
            chai.request(server).post("/payment").send({
                "id": 1
            }).end((err, response) => {
                response.should.have.status(200);
                const obj = response.body
                obj.should.be.a('object');




                done()
            });
        });



    });


});