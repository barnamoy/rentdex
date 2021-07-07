import React from 'react'
import axios from 'axios';
// import Card from './../body/card/card'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'

import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import { Modal, InputGroup, FormControl, Button, FormText } from 'react-bootstrap';
import "./cart.css";
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
class cart extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      isLoaded: false,
      data: [],
      open: false,
      arr: []
    }
    this.postObject = {
      name: "",
      email: "",
      phone: null,
      address: ""

    }

    this.fetchdata()
    console.log("data fetched ")






  }
  componentDidMount() {
    if (localStorage.getItem('jwt') == null) {
      this.props.history.push('/login')
    }
  }
  fetchdata = () => {
    console.log("data fetched")
    if (localStorage.getItem('jwt') == null) {
      this.props.history.push('/login')
      return
    }
    axios.get('http://localhost:4000/cart').then(res => {
      console.log(res.data)
      this.setState({
        isLoaded: true,
        data: res.data,
        arr: [],
        total: 0,
        count: 0

      })

      this.state.data.forEach(element => {
        axios.get("http://localhost:4000/?id=" + element.item).then(res => {
          this.setState(previousState => ({
            arr: [...previousState.arr, res.data[0]],
            total: previousState.total + parseInt(res.data[0].price),
            count: previousState.count + 1
          }));
        })
      });


    })
  }
  handleNameChange = (e) => {
    this.postObject.name = e.target.value;

  }
  handleEmailChange = (e) => {
    this.postObject.email = e.target.value;
  }
  handlePhoneChange = (e) => {
    this.postObject.phone = e.target.value;
  }
  handleAddressChange = (e) => {
    this.postObject.address = e.target.value;
  }


  handleClickOpen = () => {
    this.setState({
      open: true
    })

  };

  handleClose = () => {
    this.setState({
      open: false
    })

  };
  deleteDuplicate = (arr) => {
    let idarr = []
    let objj = []
    for (let obj of arr) {
      if (idarr.includes(obj.id)) {
        continue
      }
      else {
        idarr.push(obj.id)
        objj.push(obj)

      }
    }
    let filteredData = []
    for (let i of objj) {
      let count = 0;
      for (let j of arr) {
        if (i.id == j.id) {
          count++
        }
      }
      i.count = count
      filteredData.push(i)
      // console.log(i)      
    }
    return filteredData

  }
  placeOrder = () => {
    if (this.postObject.address == "" || this.postObject.name == "" || this.postObject.email == "" || this.postObject.phone == "") {
      alert("Please fill the form correctly");
      return;
    }
    // console.log('hi ')
    axios.post('http://localhost:4000/buy', this.postObject).then(res => {
      // console.log(res.data)
      this.handleClose()
      this.props.history.push("/");
    }).catch(err => {

    })

  }
  handledelete = (id) => {
    console.log(id)
    let filterid = -1;
    this.state.data.forEach(e => {
      console.log(e)
      if (e.item == id) {
        filterid = e.id
      }
    })
    axios.delete('http://localhost:4000/cart/' + filterid).then(res => {
      console.log(res.data)
      this.fetchdata()
    }).catch(err => {

    })
  }
  render() {
    if (this.state.isLoaded) {
      console.log(this.state)
    }
    let data = this.state.data
    let arr = this.state.arr
    arr = this.deleteDuplicate(arr)
    return (
      <div>
        <toster />
        {/*<button onClick={()=>this.click()}> Buy Now</button>*/}
        <div>
          {/* <Button variant="outlined" color="primary" onClick={() => this.handleClickOpen()} >
            Buy Now
          </Button> */}
          <div class="row ">
            <div className="col container  mx-3 bg-white">

              <h2>Shopping Cart</h2>
              {/* <div class="dropdown-divider"></div> */}

              {arr.map((item, index) => (
                <div key={item.id}>
                  <div style={{ textDecoration: 'none' }} >
                    {/* <Card
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                /> */}
                    <div class="container  my-5 border rounded shadow p-3 mb-5">
                      <div>
                        <div class="row">
                          <div class="col-lg-2 xs-col-6">
                            <img src={"http://localhost:4000/" + item.imgurl} height="100px"  ></img>
                          </div>
                          <div class="col ml-4 ml-xs-0">
                            <div class="font-weight-bold">
                              {item.name}
                            </div>
                            <div class=" font-weight-bold" >
                              <div>
                                Price : ₹{item.price}
                              </div>
                              <button class="btn btn-primary h-25 ml-5 float-right" onClick={() => this.props.history.push("/product/" + item.id)} >Details</button>
                            </div>
                            <div class="text-danger">Eligible for FREE Shipping</div>
                            <div>Seller: {item.seller}</div>
                            <div>Estimated Delivery Time : 2hr</div>
                            <div class="row">
                              <input
                                type="tel"
                                class="form-control col-1 text-center m-1 h-25 ml-3"
                                value={item.count}
                              // style={{ width: "20%"}}
                              />
                              <button class="btn btn-primary h-25 ml-5" onClick={() => this.handledelete(item.id)} >Delete</button>


                            </div>
                          </div>
                        </div>
                      </div>
                    </div>



                  </div>
                </div>
              ))}




            </div>
            <div class="col-3 mt-5 border rounded proceedbox shadow p-3 mb-5" >
              <div class="mt-3 font-weight-bold ">
                Your order is eligible for FREE Delivery. Select this option at checkout. Details
              </div>
              <div>subtotal : <i class="font-weight-bold">{this.state.total}</i></div>
              <div>total No of product: <i class="font-weight-bold">{this.state.count}</i></div>

              <button class="btn btn-danger m-5" onClick={() => this.handleClickOpen()}  >Proceed to Buy</button>
            </div>


          </div>

          <Modal show={this.state.open} onHide={() => this.handleClose()} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Proceed to Buy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h5>Name</h5>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Name"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={this.handleNameChange}
                  />
                </InputGroup>
              </div>

              <div>
                <h5>Email</h5>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Email"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={this.handleEmailChange}
                  />
                </InputGroup>
              </div>

              <div>
                <h5>Phone</h5>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Phone"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={this.handlePhoneChange}
                  />
                </InputGroup>
              </div>

              <div>
                <h5>Address</h5>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Address"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={this.handleAddressChange}
                  />
                </InputGroup>
              </div>



            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={() => this.handleClose()}>
                Close
              </Button>
              <Button variant="danger" className="btn" onClick={() => this.placeOrder()}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );

  }
}
export default cart