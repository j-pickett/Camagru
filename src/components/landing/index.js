import Gallery from '../gallery';
import React, { Component } from 'react';
const styles = {
    gallery: {
      position: "center",
      align: "center",
    },
    webcam: {
      height: '50%',
    },
  }

export default class LandingPage extends Component {
    render() {
      return (
        <div style={styles.gallery}>
          <div style={styles.gallery}>
      <Gallery/>
      </div>
        </div>
      )};
}