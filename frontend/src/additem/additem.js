import React from 'react'
import axios from 'axios';
// import Card from './../body/card/card'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Select } from '@material-ui/core';


class additem extends React.Component {

  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.priceInput = React.createRef();
    this.descriptioninput = React.createRef();
    this.sellerInput = React.createRef();
    this.catInput = React.createRef();


    this.state = {
      selectedFile: null,
      selectedCat: null
    }
  }
  componentDidMount() {
    this.nameInput.current.focus();


  }

  onselectchange = event => {
    console.log(event.target.value)
    this.setState({
      selectedCat: event.target.value
    })
  }
  onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

  };
  onFileUpload = () => {
    console.log("here")
    if(this.state.selectedFile==null||this.state.selectedCat==null||this.nameInput.current.value==""||this.priceInput.current.value==""||this.descriptioninput.current.value=="")
    {
      alert("Please fill the form correctly");
      return;
    }
    if(this.state.selectedFile.type!="image/png" && this.state.selectedFile.type!="image/jpeg" && this.state.selectedFile.type!="image/jpg" )
    {
      alert(`Please upload an image (jpg or png)`);
      return;
    }

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "productimg",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    formData.append(
      "name",
      this.nameInput.current.value,

    );
    formData.append(
      "price",
      this.priceInput.current.value,

    );
    formData.append(
      "description",
      this.descriptioninput.current.value,

    );
    formData.append(
      "category",
      this.state.selectedCat,

    );

    
    // Details of the uploaded file
    console.log(this.state.selectedFile.type);
    // console.log(this.catInput.current.selectVal)
   
    axios.post('http://localhost:4000/items', formData).then(res => {
      console.log(res)
      this.props.history.push("/dashboard");
    })

  };
  render() {
    return (
      <div class="container my-3 ">

        <div class="form-group">
          <label for="exampleInputEmail1">Product Name</label>
          <input ref={this.nameInput} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Name" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Price</label>
          <input ref={this.priceInput} type="text" class="form-control" id="exampleInputPassword1" placeholder="price" />
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Description</label>
          <input ref={this.descriptioninput} type="text" class="form-control" id="exampleInputPassword1" placeholder="description" />
        </div>


        <div class="form-group">
          <label for="exampleInputPassword1">Category</label>
          <br />
          <Select onChange={this.onselectchange} type="text" class="form-control" id="exampleInputPassword1" placeholder="category">
            <option value="Drinking Water">Drinking Water</option>
            <option value="Fruits & Vegetables">Fruits & Vegetables</option>
            <option value="Glasses">Glasses</option>
            <option value="Toys">Toys</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Fashion">Fashion</option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Groceries">Groceries</option>
            <option value="Appliances">Appliances</option>
            <option value="Medicines">Medicines</option>


          </Select>
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">Image</label>
          <input onChange={this.onFileChange} type="file" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>

        <button type="submit" class="btn btn-primary float-right " style={{ width: "200px" }} onClick={this.onFileUpload}>Submit</button>

      </div>

    )
  }

}
export default additem