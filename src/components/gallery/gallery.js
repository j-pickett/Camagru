import React from 'react';
import cash from '../images/cash.png';
import grillz from '../images/grillz.png'
import tty from '../images/tty.png';
import parrot from '../images/parrot.png';
import hat from '../images/hat.png';
import './gallery.css';
import { withStyles } from "@material-ui/core/styles";
import Draggable from 'react-draggable';

const styles = theme => ({
    root: {
      flexGrow: 1,
      direction: "row",
      justify: "center",
      alignItems:"baseline",
      size: 'fit',
      maxHeight: 150,
      maxWidth: 200,
    },
    gallery: {
      size: 'fit',
      maxHeight: 200,
      maxWidth: 200,
    },
  });
  
  function Gallery() {
    return (
        <div style={styles.root}>
        <Draggable><img src={tty} style={styles.gallery} alt="tty" height="150"/></Draggable>
        <Draggable><img src={parrot} style={styles.gallery} alt="parrot" height="150"/></Draggable>
        <Draggable><img src={hat} style={styles.gallery} alt="hat" height="150"/></Draggable>
        <Draggable><img src={grillz} style={styles.gallery} alt="grillz" height="150"/></Draggable>
        <Draggable><img src={cash} style={styles.gallery} alt="cash" height="150"/></Draggable>
        </div>
    );
}

export default withStyles(styles)(Gallery);
