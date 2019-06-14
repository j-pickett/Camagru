import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import Webcam from '@material-ui/icons/Videocam';
import Chat from '@material-ui/icons/Forum';
import MoreIcon from '@material-ui/icons/MoreVert';
import Banner from '../images/Camagru.png';
import MenuButton from './menu';
/* import SignUp from '../signup';
import Mail from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ReactDOM from 'react-dom';*/
import { Link } from 'react-router-dom';
import Navigation from '../navigation';
import * as ROUTES from '../constants/routes';
import {
  BrowserRouter as Router,
  //Route,
} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

 const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2c387e',
    },
    secondary: {
        main: '#33eaff',
    }
},
});

const styles = theme => ({
  root: {
    width: '100%',
  },
  NavBanner: {
    display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  paddingTop: 10,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,

  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    color: '#33eaff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: '#33eaff',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    account: {
      color: '#33eaff',
    },
    mail: {
      color: '#33eaff',
    }
  },
});

/* function SwitchToLogin() {
	ReactDOM.render(<SignUp />, document.getElementById('root'));
} */

class PrimarySearchAppBar extends React.Component {
  state = {
    /* auth: true, */
    /* anchorEl: null, */
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };


  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { /* anchorEl */ mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    /*const isMenuOpen = Boolean(anchorEl);
    const {auth} = this.state; */
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
              <Chat/>
          </IconButton>
          <p>Forum</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <Webcam />
          </IconButton>
          <p>Camera</p>
        </MenuItem>
      </Menu>
    );
    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
       <AppBar position="static">
          <Toolbar>
            {/* <Router>
              <Navigation/>
            </Router> */}
          <div id="drawer">
          <MenuButton iconType={MenuIcon} items={['add', 'to', 'navi']}/>
            </div>
            
            <Typography className={classes.title} variant="h6" noWrap >
            
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>

             <div className={classes.NavBanner}>
             <Router>
             <marquee><a href={ROUTES.LANDING}><img src={Banner} style={styles.NavBanner} width="450px"height="75px" padding-top="25px"></img></a></marquee>{/* eslint-disable-line */}             
             </Router>
              </div>
              

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            <div className={classes.mail}>
              <IconButton color="secondary">
              {/*IconButton color="secondary">
                <a href={ROUTES.ACCOUNT}>
                <Chat/> Account
                </a>
                </IconButton> */}
                  <Chat/>
                </IconButton></div>

              <div className={classes.account}>
              <IconButton color="secondary" >
              <Webcam />
              </IconButton>
              </div>

        </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      {renderMobileMenu}
      </div>
      </MuiThemeProvider>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);