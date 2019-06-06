import React , { Component } from 'react';
import fire from './firebase';
import Login from '../components/taskbar/signup';
import Home from '../App.js';
class App extends Component {
    constructor() {
      super();
      this.state = ({
        user: null,
      });
      this.authListener = this.authListener.bind(this);
    }
  
    componentDidMount() {
      this.authListener();
    }
  
    authListener() {
      fire.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          this.setState({ user });
          localStorage.setItem('user', user.uid);
        } else {
          this.setState({ user: null });
          localStorage.removeItem('user');
        }
      });
    }
    render() {
      return (
       <div>{this.state.user ? ( <Home/>) : (<Login />)}</div>
      );
  }
  }
  
   export default App;