let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('RentDex API', () => {

    describe("GET /login", () => {
        it("Login Test", (done) => {
            chai.request(server)
                .get("/login?username=abc@gmail.com&password=123")
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
            chai.request(server).get("/getallrent").set('authtoken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE2MjU4MzI3MDcsImV4cCI6MTYyNTg2ODcwN30.Tcg4HAP1YwI4m8mMgCup8eWx6ajlO0uaZKycZzvme-0' ).end((err, response) => {
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
                "username": "test3"
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
                "adid": 2,
                "duration": 57,
                "giverid": 1
            }).set({'authtoken': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE2MjU4MzI3MDcsImV4cCI6MTYyNTg2ODcwN30.Tcg4HAP1YwI4m8mMgCup8eWx6ajlO0uaZKycZzvme-0"})
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

describe("POST /addrent", () => {
    it("It should add a rent", (done) => {
        chai.request(server).post("/addrent").send({
            "adid": 2,
            "duration": 57,
            "giverid": 1
        }).set({'authtoken': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJpYXQiOjE2MjU4MzI3MDcsImV4cCI6MTYyNTg2ODcwN30.Tcg4HAP1YwI4m8mMgCup8eWx6ajlO0uaZKycZzvme-0"})
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


});