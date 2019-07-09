import React from 'react';
import { BrowserRouter as Router,
		Route,
} from 'react-router-dom';
import SignUpPage from './components/signup';
import HomePage from './components/home';
import * as ROUTES from './components/constants/routes';
import SignInPage from './components/signin';
import AdminPage from './components/admin';
import ImagePage from './components/publicimages';
import LandingPage from './components/landing';
import AccountPage from './components/account';
import Taskbar from './components/taskbar';
import { withAuthentication } from './components/session';

const styles = {
  container: {
      minHeight: "100vh",
      textAlign: 'center',
      minWidth: '100vw',
      background:
      "url(http://papers.co/wallpaper/papers.co-vm09-poly-blue-purple-abstract-pattern-36-3840x2400-4k-wallpaper.jpg) no-repeat center center fixed",
    backgroundSize: '100vw 100vh',
    position: "flex",
    fontSize: 'calc(10px + 2vmin)',
    color: 'rgba(255, 255, 255, 0.6)',
    flexGrow: 1,
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
    paddingBottom: 25,
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
    bottom: 0,
    width: '100%',
    height: 30,
  },
  taskbar: {
    paddingBottom: "20",
  }
}

const App = () => (
	<Router>
  <div style={styles.container}>

      <div style={styles.taskbar}>
      <Taskbar />
      </div>

			<Route exact path={ROUTES.LANDING} component={LandingPage} />
			<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
			<Route path={ROUTES.SIGN_IN} component={SignInPage} />
			<Route path={ROUTES.HOME} component={HomePage} />
			<Route path={ROUTES.ACCOUNT} component={AccountPage} />
			<Route path={ROUTES.ADMIN} component={AdminPage} />
			<Route path={ROUTES.POSTS} component={ImagePage} />
		</div>
	</Router>
);

export default withAuthentication(App);
