let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("./../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    /**
     * Test the GET route
     */
    describe("GET /api/tasks", () => {
        it("It should GET all the tasks", (done) => {
            chai.request(server)
                .get("/items")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    const obj =response.body[0]
                    obj.should.be.a('object') ;
                    obj.should.have.property('id');
                    obj.should.have.property('name');
                    obj.should.have.property('price');
                    obj.should.have.property('description');
                    obj.should.have.property('imgurl');
                    obj.should.have.property('seller');
                    obj.should.have.property('category');
                    obj.should.have.property('selleremail');
                    
                    
                    
                done();
                });
        });
        
        it("It should GET all the tasks", (done) => {
            chai.request(server)
                .get("/login?username=carteasy.user1@gmail.com&password=123")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    console.log(response.body)
                    // response.body.should.have.property('error');
                    
                    
                    
                done();
                });
        });
        

    });



});

