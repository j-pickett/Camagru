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
import MenuList from '@material-ui/core/MenuList';


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
   <MenuList style={{ disableGutters: "true" }}><Link style={{ textDecoration: 'none' }} to={ROUTES.LANDING}><IconButton><Land></Land> Landing</IconButton></Link></MenuList>
    
   <MenuList style={{ disableGutters: "true" }}><Link style={{ textDecoration: 'none' }} to={ROUTES.HOME}><IconButton><Home></Home> Home</IconButton></Link></MenuList>
    
    <MenuList style={{ disableGutters: "true" }}><Link style={{ textDecoration: 'none' }} to={ROUTES.ACCOUNT}><IconButton><AccountCircle></AccountCircle> Account</IconButton></Link></MenuList>
    
    {authUser.roles.includes(ROLES.ADMIN) && (
    <MenuList style={{ disableGutters: "true" }}><Link style={{ textDecoration: 'none' }} to={ROUTES.ADMIN}><IconButton><HTTPS></HTTPS> Admin</IconButton></Link></MenuList>
      
    )}
   
   <MenuList ><Exit/><SignOutButton /></MenuList>
    </div>
);

const NavigationNonAuth = () => (
  <div>
    <MenuList disableGutters="true"><IconButton><Link style={{ textDecoration: 'none' }} to={ROUTES.LANDING}><Land></Land> Landing</Link></IconButton></MenuList>
    
    <MenuList disableGutters="true"><IconButton><Link style={{ textDecoration: 'none' }} to={ROUTES.SIGN_IN}><FiberNew></FiberNew>Sign In</Link></IconButton></MenuList>
  </div>
);

export default Navigation;