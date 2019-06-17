import React from 'react';
import Taskbar from './components/taskbar/taskbar';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MyFooter from './components/cover_image/footer';
import LandingPage from './components/landing';
import AccountPage from './components/account';
 import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import SignUpPage from './components/signup';
import HomePage from './components/home';
import * as ROUTES from './components/constants/routes';
import SignInPage from './components/signin';
import AdminPage from './components/admin';
import { withAuthentication } from './components/session';

const styles = {
  container: {
      textAlign: 'center',
      minHeight: '100vh',
      minWidth: '100vw',
      background:
      "url(http://papers.co/wallpaper/papers.co-vm09-poly-blue-purple-abstract-pattern-36-3840x2400-4k-wallpaper.jpg) no-repeat center center fixed",
    backgroundSize: '100% 100%',
    position: "relative",
  },
  appBanner: {
    width: '10vmin',
    height: '4vmin',
    position: 'center top',

  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  sticker: {
    minHeight: '20vmin',
    width: '20vmin',
    paddingRight: '15px',
    paddingLeft: '15px',
    objectFit: 'contain',
    top: 0,
  },
  gallery: {
    paddingBottom: 25,
    paddingTop: 25,
  },
  webcam: {
    height: '50%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
  }
}

const App = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>

      <Router>
      <div style={styles.taskbar}>
      <Taskbar />
      </div>

      
          <div>
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route exact path={ROUTES.HOME} component={HomePage} />
            <Route exact path={ROUTES.ADMIN} component={AdminPage} />
            <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
          </div>
        </Router>
      </header>
      <div style={styles.footer}>
      <MyFooter/>
      </div>
    </div>
    
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuthentication((withStyles(styles)(App)));
