import React from 'react'
import axios from 'axios'
class register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_conf: '',
      phone: '',
      address: ''
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePassword_conf = this.handlePassword_conf.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleUsername(event) {
    this.setState({ username: event.target.value });

  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }
  handlePassword_conf(event) {
    this.setState({ password_conf: event.target.value });
  }
  handleSubmit(event) {

    if (this.state.username == "" || this.state.password == "" || this.state.password_conf == "") {
      alert("Please fill the form correctly");
      return;
    }
    if (this.state.password !== this.state.password_conf) {
      alert("Password and confirm password are not matching")
      return
    }
    axios.post('http://localhost:4000/register',this.state).then((res)=>{
      console.log(res)
      this.props.history.push('/')
    })
    event.preventDefault();
  }
  render() {
    return <div class="container">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input onChange={this.handleUsername} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Phone Number</label>
        <input onChange={(event) => {
          this.setState({
            phone: event.target.value
          })
        }} type="text" class="form-control" id="exampleInputPassword1" placeholder="Phone No" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Address</label>
        <input onChange={(event) => {
          this.setState({
            address: event.target.value
          })
        }} type="text" class="form-control" id="exampleInputPassword1" placeholder="Address" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input onChange={this.handlePassword} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Confirm Password</label>
        <input onChange={this.handlePassword_conf} type="password" class="form-control" id="exampleInputPassword2" placeholder="Confirm Password" />
      </div>
      <button onClick={this.handleSubmit} type="submit" class="btn btn-primary">Submit</button>
    </div>
  }
}
export default register

