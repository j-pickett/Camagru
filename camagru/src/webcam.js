import './webcam.css'
import React from 'react';
import Webcam from 'react-webcam';
import tty from './images/tty.png';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'flex-end',
        justifyContent: 'space-between',
        backgroundColor: 'red',
        height: '50%',
        width: '100%',
        border: '1px solid rgba(0, 0, 0, 2)',
        paddingBottom: '50px',
        border: '1px solid rgba(255, 0, 0, 2)',
        right: 0
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        backgroundColor: 'blue',
        width: '50%',
        height: 0,
        justifyContent: 'right',
        border: '1px solid rgba(0, 0, 0, 2)',

    },
    Webcam: {
        autoplay: "",
        width: "1640",
        height: "480",
        backgroundColor: 'white'
    },
    GridItem: {
        width: '317px',
        height: '120px',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255)',
        border: '1px solid rgba(165, 0, 0, 0.8)',
        padding: '20px',
        fontSize: '30px',
        textAlign: 'center'
    }/* ,
    tty: {
        width: '317px',
        height: '120px',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255)',
        border: '1px solid rgba(165, 0, 0, 0.8)',
        padding: '20px',
        fontSize: '30px',
        textAlign: 'center',
        size: 'fit'
    } */
}



class WebcamCapture extends React.Component {
        setRef = webcam => {
        this.webcam = webcam;
      };
    
      capture = () => {
        const imageSrc = this.webcam.getScreenshot();
      };
    
      render() {
        const videoConstraints = {
          width: 1280,
          height: 720,
          facingMode: "user"
        };
    
        return (
          <div style={styles.container}>
          
          <div style={styles.grid}>
                  <div style={styles.GridItem}><img src={tty} alt="tty" width="317px" height="120px"></img></div>
                  <div style={styles.GridItem}>2</div>
                  <div style={styles.GridItem}>3</div>
                  <div style={styles.GridItem}>4</div>
                  <div style={styles.GridItem}>5</div>
                  <div style={styles.GridItem}>6</div>
              </div>
            
          <div style={styles.Webcam}>
            <Webcam
              audio={false}
              height={480}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={640}
              videoConstraints={videoConstraints}
            />
            <button onClick={this.capture}>Take a selfie</button>
          </div>
  
          </div>
        );
      }
}

export default WebcamCapture;