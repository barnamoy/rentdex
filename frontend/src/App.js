import React from 'react';
import './App.css';
import Header from './header/Header'
import Footer from './footer/Footer'
import Body from './body/Body.jsx'
import Product from './product/product'
import Login from './login/login'
import register from './register/register'
import cart from './cart/cart'
import SideDrawer from './drawer/drawer'
import dashboard from './dashboard/dashboard'
import axios from "axios";
import { useState, useRef } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Store from './mystore'
import additem from './additem/additem'
import sellerregister from './sellerregister/sellerregister';


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
          <Route path="/cart" component={cart} />
          <Route path="/additem" component={additem} />
          <Route path="/sellerregister" component={sellerregister} />
          <Route path="/dashboard" component={dashboard} />
          

          <Route path="/">
            <Body />
          </Route>

        </Switch>
        <SideDrawer />
        <Footer />
      </Router>
    </Store.Container>
  );
}

export default App;
