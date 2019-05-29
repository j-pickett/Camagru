import './webcam.css'
import React from 'react';
import Webcam from 'react-webcam';
import PhotoCamera from './icons';
import Grids from './grid.js';
import Dropzone from 'react-dropzone';
import PropTypes from "prop-types";


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        paddingBottom: '50px',
        right: 0,
    },
    Card: {
    },
    button: {
    }

}


class WebcamCapture extends React.Component {
  constructor(props)
    {
        super(props);
        this.state = [];

    }
        setRef = webcam => {
        this.webcam = webcam;
      };
    
      capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.state.push(imageSrc);
        console.log(this.state);
      };
    
      render() {
        const videoConstraints = {
          width: 1280,
          height: 720,
          facingMode: "user"
        };
    
        return (
          <div style={styles.container}>
{/*           <Dropzone onDrop={files => console.log(files)}>
 */}            <div style={styles.Webcam}>
            <Webcam
              audio={false}
              height={720}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={900}
              videoConstraints={videoConstraints}
            />
          <div style={styles.button}>
          <PhotoCamera onClick={this.capture}/>
          <button onClick={this.capture}>TEST ME</button>
          </div>
          </div>
{/*           </Dropzone>
 */}
          <div style={styles.Card}>
          <Grids>
          </Grids>
          </div>

  
          </div>
        );
      }
}

 WebcamCapture.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (WebcamCapture);