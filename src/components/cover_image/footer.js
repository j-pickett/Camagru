import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* import ArrowUpward from '@material-ui/icons/VerticalAlignTop';
import IconButton from '@material-ui/core/IconButton'; */
import {
  faYoutube,
  faLinkedin,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '50',
    bottom: 0,
    paddingTop: 20,
    positon: "absolute",
  },
  main: {
    marginTop: 0,
    marginBottom: 2,
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: '#2c387e',
  },
  twitter: {
    transition: 'color .1s ease',
    transitionProperty: 'color',
    transitionDuration: '0.1s',
    transitionTimingFunction: 'ease',
    transitionDelay: 'initial',
    color: '#33eaff',

  },
  ul: {
    listStyle: 'none outside',
    padding: 10,
    display: 'inline',
    float: 'left',
    margin: '0 auto',
  },
  socialNav: {
    display: 'table',
    margin: '0 auto',
  },
  li: {
    float: 'left',
    padding: 15,
    
  },
  TopButton: {
    float: 'right',
    paddingLeft: 100,
  },
  Top: {
    color: "#E20CFF",
  }
}));

const cyan = { color: '#33eaff'};

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
      <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="header1" style={cyan} gutterBottom>Made by: Austin Pickett</Typography>
          <br></br>
          <Typography variant="header1" style={cyan} gutterBottom>Intra: apickett</Typography>

         <div  className={classes.socialNav}>
          <ul id="social_icons" className={classes.ul}>
          <li className={classes.li}>
          <a href="https://twitter.com/AustinP55381017" className={classes.twitter} data-show-count="false">
          <FontAwesomeIcon icon={faTwitter} size="3x" /></a>
          </li>
          <li className={classes.li}>
            <a href="https://github.com/j-pickett"  style={cyan}>
            <FontAwesomeIcon icon={faGithub} size="3x" />
            </a>
          </li>
          <li className={classes.li}>
          <a href="https://www.linkedin.com/in/austin-pickett-999217162/"  style={cyan}>
          <FontAwesomeIcon icon={faLinkedin} size="3x" />
            </a>
          </li>
          <li className={classes.li}>
          <a href="https://www.youtube.com/channel/UCbo04DtwoZpVNMNOGZWFaWQ"  style={cyan}>
          <FontAwesomeIcon icon={faYoutube} size="3x" />
            </a>
          </li>
          </ul>
          {/*<div className={classes.TopButton}>
           <IconButton className={classes.Top}>
            <ArrowUpward/>
          </IconButton> 
          </div>*/}
          </div>
        </Container>
      </footer>
    </div>
  );
}