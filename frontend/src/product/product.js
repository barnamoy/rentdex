import React from "react";
import "./product.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import StarIcon from "@material-ui/icons/Star";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import StarRatings from "react-star-ratings";

class product extends React.Component {
  constructor(props) {
    super(props);
    let from = new URLSearchParams(this.props.location.search).get("from");
    console.log(from);
    let id = props.match.params.id;
    this.cartClick = this.cartClick.bind(this);
    this.button_text = "Add to the cart";
    if (from == "cart") {
      this.button_text = "already in the cart";
      console.log(this.button_text);
    }
    this.state = {
      rating: 0.0,
      isLoaded: false,
      id: id,
      data: {},
      number: 1
    };
    axios("http://localhost:4000?id=" + id).then((result) => {
      if(result.data[0].ratingcount==0)
      {
        // result.data[0].ratingcount=1;
        this.setState({
          rating: 0,
          isLoaded: true,
          data: result.data[0],
        });

      }
      else{
        this.setState({
          rating: result.data[0].rating / result.data[0].ratingcount,
          isLoaded: true,
          data: result.data[0],
        });
      }
      
      console.log('this state is ', this.state);
    });
  }
  cartClick() {
    console.log(this.state);
    if (!localStorage.getItem("jwt")) {
      this.props.history.push("/login");
      return;
    }
    axios("http://localhost:4000/addcart/", {
      params: {
        id: this.state.id,
        number: this.state.number,
        url: this.state.data.imgurl,
        name: this.state.data.name,
        seller: this.state.data.seller,
        price: this.state.data.price,
        selleremail: this.state.data.selleremail
      },
    }).then((result, err) => {
      if (err) return
      else {
        console.log(result.data)
        this.props.history.push('/')
      }
    });
  }
  buyNow = () => {
    // console.log(this.state);
    if (!localStorage.getItem("jwt")) {
      this.props.history.push("/login");
      return;
    }
    axios("http://localhost:4000/addcart/", {
      params: {
        id: this.state.id,
        number: this.state.number,
        url: this.state.data.imgurl,
        name: this.state.data.name,
        seller: this.state.data.seller,
        price: this.state.data.price,
        selleremail: this.state.data.selleremail
      },
    }).then((result, err) => {
      if (err) return
      else {
        console.log(result.data)
        this.props.history.push('/cart')
      }
    });

  }
  render() {
    const { isLoaded, data } = this.state;

    return (
      <div>
        <toster />
        <div class="container mt-5">
          <div class="row">
            <div class="col float-left m-0 p-0">
              <img
                class="rounded col"
                src={"http://localhost:4000/" + this.state.data.imgurl}
                style={{ width: "100%" }}
              />
              <div class="row p-3 mt-5">
                <div class="col btn">
                  <img
                    class="rounded col border"
                    src={"http://localhost:4000/" + this.state.data.imgurl}
                    style={{ width: "100%" }}
                  />
                </div>
                <div class="col btn">
                  <img
                    class="rounded col border"
                    src={"http://localhost:4000/" + this.state.data.imgurl}
                    style={{ width: "100%" }}
                  />
                </div>

                <div class="col btn">
                  <img
                    class="rounded col border"
                    src={"http://localhost:4000/" + this.state.data.imgurl}
                    style={{ width: "100%" }}
                  />
                </div>
                <div class="col btn">
                  <img
                    class="rounded col border"
                    src={"http://localhost:4000/" + this.state.data.imgurl}
                    style={{ width: "100%" }}
                  />
                </div>
                <div class="col btn">
                  <img
                    class="rounded col border"
                    src={"http://localhost:4000/" + this.state.data.imgurl}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div class="text-dark col float-right" >
              <div><h4 style={{ 'font-size': '24px', 'font-weight': 'bold' }}>{this.state.data.name}</h4></div>

              <StarRatings
                rating={this.state.rating}
                starDimension='30px'
                starRatedColor="rgb(255, 200, 0)"
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
              /> <span style={{ fontSize: '25px' }}>({this.state.data.ratingcount})</span>

              <br />
              <div class="my-2" style={{ 'font-size': '23px', 'font-weight': 'bold' }}>Price: ₹ {this.state.data.price}</div>
              <div class="my-2 text-danger" style={{ 'font-size': '20px' }}>Seller Name: {this.state.data.seller}</div>
              <div class="my-2 text-danger" style={{ 'font-size': '20px' }}>Seller email: <a href={'mailto:' + this.state.data.selleremail}>{this.state.data.selleremail}</a></div>
              <div class="my-2 text-danger" style={{ 'font-size': '20px' }}>Seller Address: {this.state.data.address}</div>
              <div class="my-4" style={{ 'font-size': '20px' }}>
                <b>Description:</b><br /> {this.state.data.description}
              </div>
              <div class="row my-4">
                <button class="btn btn-primary col-1 m-1" onClick={() => { this.state.number == 1 ? this.setState({ number: this.state.number }) : this.setState({ number: this.state.number - 1 }) }}>-</button>

                <input
                  type="number"
                  class="form-control col-1 text-center m-1"
                  value={this.state.number}
                  style={{ width: "20%" }}
                />

                <button class="btn btn-primary col-1 m-1" onClick={() => { this.setState({ number: this.state.number + 1 }) }} >+</button>
              </div>
              <div class="row">
                <button class="btn btn-primary col mx-2" onClick={this.cartClick}>Add to cart</button>
                <button class="btn btn-secondary col mx-2" onClick={this.buyNow}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default product;