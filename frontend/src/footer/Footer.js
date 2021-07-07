import React from 'react';
import "./footer.css"
import store from './../mystore'
import ftImg from './6856.jpg'
class Footer extends React.Component {
  constructor(props){
    super(props)
  }
    render() {
      return <footer className="page-footer font-small unique-color-dark pt-4">
        {/* <img src={ftImg}  ></img> */}

    </footer> 
        
    }
  }
  export default store.withStore(Footer)