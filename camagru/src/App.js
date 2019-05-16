import React from 'react';
import cash from './images/cash.png';
import grillz from './images/grillz.png'
import tty from './images/tty.png';
import parrot from './images/parrot.png';
import hat from './images/hat.png';
import banner from './images/Camagru.png';
//import draggable from './drag'
//import droppable from './drop'
import Draggable from 'react-draggable';

const styles = {
  container: {
      textAlign: 'center',
      height: '100%',
      border: '1px solid rgba(0, 0, 0, 2)'
  },
  appBanner: {
    width: '122vmin',
    height: '45vmin',
    position: 'center top',
    border: '1px solid rgba(0, 0, 0, 2)'

  },
  header: {
    backgroundColor: '#f0c0f0',
    minHeight: '70vh',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'rgb(255, 255, 255)',
    border: '1px solid rgba(255, 190, 255, 2)'
  },
  sticker: {
    minHeight: '20vmin',
    width: '20vmin',
    paddingRight: '15px',
    paddingLeft: '15px',
    objectFit: 'contain',
    border: '1px solid rgba(255, 255, 0, 2)'
  }
}

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
      <div style={styles.banner}>
      <img src={banner} style={styles.appBanner} alt="banner" />
      </div>
      <div style={styles.gallery}>
      <Draggable><img src={tty} style={styles.sticker} alt="tty" /></Draggable>
      <Draggable><img src={parrot} style={styles.sticker} alt="parrot" /></Draggable>
      <Draggable><img src={hat} style={styles.sticker} alt="hat" /></Draggable>
      <Draggable><img src={grillz} style={styles.sticker} alt="grillz" /></Draggable>
      <Draggable><img src={cash} style={styles.sticker} alt="cash" /></Draggable>
        </div>
      </header>
    </div>
  );
}

export default App;
