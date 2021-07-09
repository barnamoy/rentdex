import React from 'react';
import './App.css';
import Header from './header/Header'
import Footer from './footer/Footer'
import Body from './body/HomePageUI.jsx'
import Product from './product/AdvertisementUI'
import Login from './login/login'
import register from './register/register'

import SideDrawer from './drawer/drawer'
import axios from "axios";
import { useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Store from './mystore'
import additem from './additem/postAdvertisementUI'
import payment from './payment/payment';


function hello(jwt) {
  axios.defaults.headers.common['authtoken'] = jwt // for all requests

}

function App(props) {
  const [err, setErr] = useState(null);
  // const [jwt , setJwt] = useState(localStorage.getItem('jwt'));
  const inputRef = useRef(null);
  if (localStorage.getItem('jwt'))
    axios.defaults.headers.common['authtoken'] = localStorage.getItem('jwt') // for all requests



  return (
    <Store.Container>
      <Router>
        <Header />



        <Switch>
          <Route path="/product/:id" component={Product} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={register} />
          <Route path="/additem" component={additem} />
          <Route path="/payment" component={payment} />
          

          <Route path="/" component={Body}/>
            
        </Switch>
        <SideDrawer />
        <Footer />
      </Router>
    </Store.Container>
  );
}

export default App;
