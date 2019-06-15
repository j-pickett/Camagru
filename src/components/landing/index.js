import Gallery from '../gallery';
import React, { Component } from 'react';
import Webcam from '../webcam/webcam';

const styles = {
    gallery: {
      paddingBottom: 25,
      paddingTop: 25,
    },
    webcam: {
      height: '50%',
    },
  }

export default class LandingPage extends Component {
    render() {
      return (
        <div>
          <div style={styles.gallery}>
      <Gallery/>
      </div>
      <div style={styles.webcam}>
      <Webcam />
      </div>
        </div>
      )};
}