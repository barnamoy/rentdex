import axios from 'axios';
import React from 'react'
class sellerregister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      store_name: '',
      phone: '',
      email: '',
      password: ''
    };

    this.handleAddress = this.handleAddress.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleAddress(event) {
    this.setState({ address: event.target.value });
  }
  handleName(event) {
    this.setState({ store_name: event.target.value });
  }


  handlePhone(event) {
    this.setState({ phone: event.target.value });
  }
  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {

    if (this.state.email == "" || this.state.password == "" || this.state.address == "" || this.state.phone == "" || this.state.store_name == "") {
      alert("Please fill the form correctly");
      return;
    }
    axios.post('http://localhost:4000/sellerregister', this.state).then(result => {
      console.log(result)
      axios.post('http://localhost:4000/sellerlogin', { email: this.state.username, password: this.state.password }).then(res => {
        console.log(res)
        if (res.data.status === 'OK') {
          console.log("testing login for seller")
          localStorage.setItem('jwt', res.data.token);
          localStorage.setItem('role', res.data.role);
          axios.defaults.headers.common['authtoken'] = res.data.token

          this.props.history.push("/dashboard");
        }
      })
      this.props.history.push("/dashboard")

    })
    event.preventDefault();
  }
  render() {
    return <div class="container">
      <div class="form-group">
        <label for="exampleInputEmail1">Address</label>
        <input onChange={this.handleAddress} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Address" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Shop Name</label>
        <input onChange={this.handleName} class="form-control" id="exampleInputPassword1" placeholder="Shop Name" />
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Phone</label>
        <input onChange={this.handlePhone} class="form-control" id="exampleInputPassword2" placeholder="Phone" />
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Email</label>
        <input onChange={this.handleEmail} class="form-control" id="exampleInputPassword2" placeholder="Email" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input onChange={this.handlePassword} type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" />
      </div>
      <button onClick={this.handleSubmit} type="submit" class="btn btn-primary">Submit</button>
    </div>
  }
}
export default sellerregister
