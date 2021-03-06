import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import SignUp from './signup';
import React, { Component } from 'react';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="http://localhost:3000/">
        Return to Homepage
      </Link>
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
	backgroundPosition: 'center',
	minHeight: 1,
	minWidth: 1,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
	alignItems: 'center',
	backgroundColor: 'transparent',
	boxShadow: 'none',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
	marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


async function submit() {
	/*
	** Check for Api calls. prepare for onrender stuff by the app. 
	** stuff stuff stuff
  */
}

function SwitchToSignUp() {
	ReactDOM.render(<SignUp />, document.getElementById('root'));
}

export default class SignInSide extends Component {
  constructor(props) {
    super(props);
    //this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /* login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
        ReactDOM.render(<App />, document.getElementById('root'));
      });
  } */

  render() {
    const classes = useStyles;
  return (
	  <div>
	  <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" onClick={submit()}>
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
			  />
            <TextField
              value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
              autoComplete="current-password"
			  />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
			  />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              //onClick={this.login}
			  >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={SwitchToSignUp}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <MadeWithLove />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
</div>
  )};
}





