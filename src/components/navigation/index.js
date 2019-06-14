import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { AuthUserContext } from '../session';
import SignOutButton from '../signout';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';
import IconButton from '@material-ui/core/IconButton';
import HTTPS from '@material-ui/icons/Https';
import Land from '@material-ui/icons/Landscape';
import Home from '@material-ui/icons/Home';
import FiberNew from '@material-ui/icons/FiberNew';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import App from '../../App';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <ul style={{ listStyleType: "none" }}>
    <li><IconButton><Link to={ROUTES.LANDING}><Land></Land> Landing</Link></IconButton>
    </li>
    <li><IconButton><Link to={ROUTES.HOME}><Home></Home> Home</Link></IconButton>
    </li>
    <li><IconButton><Link to={ROUTES.ACCOUNT}><AccountCircle></AccountCircle> Account</Link></IconButton>
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li><IconButton><Link to={ROUTES.ADMIN}><HTTPS></HTTPS> Admin</Link></IconButton>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul style={{ listStyleType: "none" }}>
    <li><IconButton><Link to={ROUTES.LANDING}><Land></Land> Landing</Link></IconButton>
    </li>
    <li><IconButton><Link to={ROUTES.SIGN_IN}><FiberNew></FiberNew>Sign In</Link></IconButton>
    </li>
  </ul>
);

export default Navigation;