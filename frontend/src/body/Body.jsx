import React from 'react'
import Card from './card/card'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import axios from "axios";
import './Body.css'
import SpacingGrid from './grid/SpacingGrid';
import water from './icons/water_icon.png'
import books from './icons/books_icon.png'
import electronic from './icons/electronics_icon.png'
import fashion from './icons/fashion_icon.png'
import furniture from './icons/furniture_icon.png'
import glasses from './icons/glasses_icon.png'
import groceries from './icons/groceries_icon.png'
import medicines from './icons/medicines_icon.png'
import phone from './icons/phone_icon.png'
import toys from './icons/toys_icon.png'
import vegetables from './icons/vegetables_icon.png'
import appliances from './icons/appliances_icon.png'




class Body extends React.Component {
  constructor(props) {

    super(props)
    this.state = {
      path: window.location.pathname,
      error: null,
      isLoaded: false,
      items: [],
      catagory: ['Drinking Water', 'Fruits & Vegetables', 'Glasses', 'Toys', 'Mobiles', 'Fashions', 'Furniture', 'Electronics', 'Books', 'Groceries', 'Appliances', 'Medicines'],
      icons: [water, vegetables, glasses, toys, phone, fashion, furniture, electronic, books, groceries, appliances, medicines],
      cat: "Other"
    };
    console.log(props)
    this.handleChange = this.handleChange.bind(this);

    axios("http://localhost:4000/items").then(res => {
      console.log(res.data)
      this.setState({
        items: res.data,
        isLoaded: true
      })
    })

  }
  componentDidMount() {
    console.log('hihi')
  }
  handleChange = (e) => {
    axios("http://localhost:4000/items?search=" + e.target.value).then(res => {
      console.log(res.data)
      this.setState({
        items: res.data,
        isLoaded: true
      })
    })
    console.log(e.target.value)
  }
  handleCat = (cat) => {
    axios("http://localhost:4000/items?search=" + this.state.catagory[cat]).then(res => {
      console.log(res.data)
      this.setState({
        items: res.data,
        isLoaded: true
      })
    })
  }
  render() {
    const { error, isLoaded, items } = this.state;
    return <div >
      <div class="container w-10" >
        <div class="form-group my-3" >
          <input onChange={this.handleChange} class="form-control" id="exampleInputEmail1" placeholder="Search" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          {
            items.map(item => (
              <li key={item.id}>
                <Link to={'/product/' + item.id} ><Card id={item.id} name={item.name} price={item.price} description={item.description} url={item.imgurl} seller={item.seller} />
                </Link>
                {/* <SpacingGrid></SpacingGrid> */}
              </li>
            ))
          }
        </div>

      </div>
    </div>

  }
}
export default Body