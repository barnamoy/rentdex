import React from 'react'
import axios from 'axios';
// import Card from './../body/card/card'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import StarRatings from 'react-star-ratings'

class dashboard extends React.Component {

  constructor(props) {
    super(props)
    if (localStorage.getItem("role") == "seller") {
      // this.fetchSellerInfo();
    }
    this.state = {
      sellerrating: 0,
      arr: ['none']
    }


  }


  conrender = () => {


    // this.fetchSellerInfo();
    let sellerfeature = ['Login', 'Register', 'Post Advertisement']
    let actual = ['login', 'register', 'additem']
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

  render() {

    return (
      <center>
        <div>
          <div class='container' style={{ display: 'grid', gridTemplateColumns: localStorage.getItem('role') == "seller" ? 'auto auto' : 'auto auto auto', gridGap: '30px' }}>

            <this.conrender />


          </div>

        </div>
      </center>
    )
  }
}
export default dashboard