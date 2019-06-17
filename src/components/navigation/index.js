import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../session';
import SignOutButton from '../signout';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';
import IconButton from '@material-ui/core/IconButton';
import HTTPS from '@material-ui/icons/Https';
import Land from '@material-ui/icons/Landscape';
import Home from '@material-ui/icons/Home';
import FiberNew from '@material-ui/icons/FiberNew';
import Exit from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';


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
  <div>
   <MenuItem><Link to={ROUTES.LANDING}><IconButton><Land></Land> Landing</IconButton></Link></MenuItem>
    
   <MenuItem><Link to={ROUTES.HOME}><IconButton><Home></Home> Home</IconButton></Link></MenuItem>
    
    <MenuItem><Link to={ROUTES.ACCOUNT}><IconButton><AccountCircle></AccountCircle> Account</IconButton></Link></MenuItem>
    
    {authUser.roles.includes(ROLES.ADMIN) && (
    <MenuItem><Link to={ROUTES.ADMIN}><IconButton><HTTPS></HTTPS> Admin</IconButton></Link></MenuItem>
      
    )}
   
   <MenuItem><Exit/><SignOutButton /></MenuItem>
    </div>
);

const NavigationNonAuth = () => (
  <div>
    <MenuItem><IconButton><Link to={ROUTES.LANDING}><Land></Land> Landing</Link></IconButton></MenuItem>
    
    <MenuItem><IconButton><Link to={ROUTES.SIGN_IN}><FiberNew></FiberNew>Sign In</Link></IconButton></MenuItem>
  </div>
);

export default Navigation;