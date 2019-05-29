import React from 'react';
import cash from '../images/cash.png';
import grillz from '../images/grillz.png'
import tty from '../images/tty.png';
import parrot from '../images/parrot.png';
import hat from '../images/hat.png';
import './gallery.css';
import { withStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';
/* import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'; */


const styles = theme => ({
    root: {
      flexGrow: 1,
      direction: "row",
      justify: "center",
      alignItems:"baseline",
      size: 'fit',
      maxHeight: 100,
      maxWidth: 100,
    },
    gallery: {
      size: 'fit',
      maxHeight: 100,
      maxWidth: 100,
    },
  });
  
  function Gallery() {
    return (
        <div style={styles.root}>
        <Draggable><img src={tty} style={styles.gallery} alt="tty" height="100"/></Draggable>
        <Draggable><img src={parrot} style={styles.gallery} alt="parrot" height="100"/></Draggable>
        <Draggable><img src={hat} style={styles.gallery} alt="hat" height="100"/></Draggable>
        <Draggable><img src={grillz} style={styles.gallery} alt="grillz" height="100"/></Draggable>
        <Draggable><img src={cash} style={styles.gallery} alt="cash" height="100"/></Draggable>
        </div>
    );
}

export default withStyles(styles)(Gallery);
