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

    this.state = {
      rating: 0.0,
      isLoaded: false,
      id: id,
      data: {},
      number: 1
    };
    axios("http://localhost:4000/getadvertisementbyid?id=" + id).then((result) => {
      console.log(result);

      this.setState({
        isLoaded: true,
        data: result.data[0],
      });


      console.log('this state is ', this.state);
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

              <br />
              <div class="my-2" style={{ 'font-size': '23px', 'font-weight': 'bold' }}>Price: ₹ {this.state.data.price}</div>
              <div class="my-2 text-danger" style={{ 'font-size': '20px' }}>Giver email: <a href={'mailto:' + this.state.data.email}>{this.state.data.email}</a></div>
              <div class="my-2 text-danger" style={{ 'font-size': '20px' }}>Giver Address: {this.state.data.address}</div>
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
                <button class="btn btn-secondary col mx-2" >Rent</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default product;