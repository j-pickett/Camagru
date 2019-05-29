import React from 'react';
import Gallery from './components/gallery/gallery'
import Webcam from './components/webcam/webcam';
import Taskbar from './components/taskbar/taskbar';
import PropTypes from "prop-types";
import Styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import './app.css';


const styles = {
  container: {
      textAlign: 'center',
      minHeight: '100vh',
      minWidth: '100vw',
      background:
      "url(http://papers.co/wallpaper/papers.co-vm09-poly-blue-purple-abstract-pattern-36-3840x2400-4k-wallpaper.jpg) no-repeat center center fixed",
    backgroundSize: '100% 100%',
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
    color: 'rgb(255, 255, 255)',
  },
  sticker: {
    minHeight: '20vmin',
    width: '20vmin',
    paddingRight: '15px',
    paddingLeft: '15px',
    objectFit: 'contain',
  },
  gallery: {
    paddingBottom: 25,
    paddingTop: 25,
  },
  webcam: {
    height: '50%',
  },
  card: {

  }
}

const App = props => {
  /* const { classes } = props; */
  return (

    <div style={styles.container}>
      <header style={styles.header}>

      <div style={styles.taskbar}>
      <Taskbar />
      </div>

      <div style={styles.gallery}>
      <Gallery>
      </Gallery>
      </div>

      </header>

      <div style={styles.webcam}>
      <Webcam />
      </div>

    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default (withStyles(Styles)(App));
