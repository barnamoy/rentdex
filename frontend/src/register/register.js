import React from 'react'
class register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_conf: ''
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
    if (this.state.username == "" || this.state.password == "" || this.state.password_conf=="") {
      alert("Please fill the form correctly");
      return;
    }
    if (this.state.password !== this.state.password_conf) {
      alert("Password and confirm password are not matching")
      return
    }
    fetch('http://localhost:4000/register?username=' + this.state.username + '&&password=' + this.state.password).then(res => res.json()).then(result => {
      console.log(result)
      this.props.history.push("/login")

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
// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignIn() {
//   const classes = useStyles();

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Confirm Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={8}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }
