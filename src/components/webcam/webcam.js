import './webcam.css'
import React from 'react';
import Webcam from 'react-webcam';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        paddingBottom: '50px',
        right: 0,
        positon: 'absolute',
        paddingRight: 40,
    },
    Gallery: {
      outline: '5px dotted green',
      maxWidth: '50vw',
      minWidth: '5vw',
      position: 'relative',
      left: -40,
      paddingTop: '50px',
    },
    button: {
       secondary: {
        main: '#33eaff',
    }
    }

}

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

class WebcamCapture extends React.Component {
  constructor(props)
    {
        super(props);
        this.state = {
        images: [],
        showIndex: true,
        showBullets: true,
        infinite: true,
        showThumbnails: true,
        showFullscreenButton: true,
        showGalleryFullscreenButton: true,
        showPlayButton: false,
        showGalleryPlayButton: true,
        showNav: true,
        isRTL: false,
        slideDuration: 450,
        slideInterval: 2000,
        slideOnThumbnailOver: false,
        thumbnailPosition: "bottom",
        showVideo: {},
        stopPropagation: false,
        };

    }


    setRef = webcam => {
        this.webcam = webcam;
      };
    
      _onImageLoad(event) {
        console.debug('loaded image', event.target.src);
      }
    
      _onPause(index) {
        console.debug('paused on index', index);
      }
    
      capture = () => {
        /* const imageSrc = this.webcam.getScreenshot();
        this.images.push(imageSrc);
        this.setState(this.state);
        console.log(this.state); */
        let picture = this.webcam.getScreenshot();
        console.log(picture);
        var newpic = {
        	orignal: `${picture}.jpg`,
        	thumbnail: `${picture}`
        };
        /* this.state.images.push(picture); */

        this.state.images.push(newpic);
        this.setState(this.state);
      };
    
      render() {
        const videoConstraints = {
          width: 1280,
          height: 720,
          facingMode: "user"
        };
    
        return (
           <MuiThemeProvider theme={theme}>
          <div style={styles.container}>
            <div style={styles.Webcam}>
            <Webcam
              audio={false}
              height={720}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={900}
              videoConstraints={videoConstraints}
            />
            
          <div style={styles.button} >
        <IconButton variant="raised" color="secondary" component="span">
          <PhotoCamera onClick={this.capture}/>
        </IconButton>
          </div>
          </div>

          <div style={styles.Gallery}>
          <ImageGallery 
          items={this.state.images}
          lazyLoad={false}
          onImageLoad={this._onImageLoad}
          infinite={this.state.infinite}
          showBullets={this.state.showBullets}
          showThumbnails={this.state.showThumbnails}
          showIndex={true}
          showNav={this.state.showNav}
          isRTL={false
          }
            showFullscreenButton={false}
          showPlayButton={this.state.showPlayButton && this.state.showGalleryPlayButton}
          slideDuration={parseInt(this.state.slideDuration)}
          slideInterval={parseInt(this.state.slideInterval)}
          slideOnThumbnailOver={this.state.slideOnThumbnailOver}
          thumbnailPosition={this.state.thumbnailPosition}
          stopPropagation={this.state.stopPropagation}
          additionalClass="app-image-gallery"/>
          </div>
          </div>
          </MuiThemeProvider>
        );
      }
      
}

export default (WebcamCapture);