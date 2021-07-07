import React from 'react'
import axios from 'axios';
// import Card from './../body/card/card'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

class dashboard extends React.Component {

  constructor(props) {
    super(props)
    if (localStorage.getItem("role") == "seller") {
      this.fetchSellerInfo();
    }
    this.state = {
      sellerrating: 0,
      arr: ['none']
    }


  }

  fetchSellerInfo() {

    axios.get("http://localhost:4000/getsellerinfo").then(res => {
      console.log(res.data);
      if(res.data.ratingcount == 0){
        res.data.ratingcount=1
      }
      this.setState(
        {
          sellerrating: (res.data.rating / res.data.ratingcount)
        }
      )
    })
  }
  conrender = () => {

    if (localStorage.getItem('role') == "seller") {
      // this.fetchSellerInfo();
      let sellerfeature = ['Login', 'Register as Seller', 'Add item', 'My products']
      let actual = ['login', 'sellerregister', 'additem', 'sellerproduct']
      let durationBody = sellerfeature.map((item, i) => {
        return (
          <div>
            <Link class='btn btn-primary' style={{ marginTop: '50px', width: '300px', height: '200px', paddingTop: '80px' }} key={i} to={actual[i]}>
              <span style={{ fontSize: '25px', fontWeight: 'bold' }}>{item}</span>
            </Link>

          </div>
        );
      });
      return durationBody;
    }
    else {
      let sellerfeature = ['Login', 'Register as Customer', 'Register as Seller', 'Cart', 'Order History', 'Home']
      let actual = ['login', 'register', 'sellerregister', 'cart', 'order', '/']
      let durationBody = sellerfeature.map((item, i) => {
        return (
          <div>
            <Link class='btn btn-primary' style={{ marginTop: '50px', width: '300px', height: '200px', paddingTop: '80px' }} key={i} to={actual[i]}>
              <span style={{ fontSize: '25px', fontWeight: 'bold' }}>{item}</span>
            </Link>
          </div>
        );
      });
      return durationBody;
    }
  }

  render() {

    return (
      <center>
      <div>
        <div class='container' style={{ display: 'grid', gridTemplateColumns: localStorage.getItem('role') == "seller" ? 'auto auto' : 'auto auto auto', gridGap: '30px' }}>

          <this.conrender />


        </div>
        {localStorage.getItem("role") == "seller" &&

          // <h2 style={{textAlign:'center',marginTop:'15px'}}>Your rating as of now is: <b>{this.state.sellerrating}</b>  ⭐</h2>


          <center style={{ marginTop: '60px' }}>
            <h2>Your Rating as of now is: </h2>
            <br />
            <StarRatings
              rating={this.state.sellerrating}
              starRatedColor="rgb(255, 200, 0)"
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
            />
          </center>
        }
      </div>
      </center>
    )
  }
}
export default dashboard