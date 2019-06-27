import './webcam.css'
import React from 'react';
import Webcam from 'react-webcam';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Comment from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import tty from '../images/tty.png';
import { Input } from '@material-ui/core';

/* mobile format fixed for landing page*/
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

const useStyles = makeStyles(theme => ({
  card: {
    width: "80vw",
    height: "33vh",
    display: 'inline-block',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    background: 'linear-gradient(50deg, #2c387e 20%, #33eaff 80%)',
  },
}));

const styles = {
    container: {
        alignItems: 'center',
        flexDirection: 'flex-end',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        right: 0,
        positon: 'relative',
        display: 'inline-block', 
    },
    Gallery: {
      outline: '5px dotted green',
      maxWidth: '50vw',
      minWidth: '5vw',

      position: 'relative',
      align: 'left',
      paddingTop: '50px',
    },
    mobileGallery: {
      outline: '5px dotted green',
      maxWidth: '100vw',
      minWidth: '5vw',
      align: 'center',
      height: "45vh",
      positon: 'absolute',
    },
    button: {
      size: 0,
       secondary: {
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        main: '#33eaff',
        display: 'inline-block',
        transform: "translate(100px, 100px)",
    }
    }

}

function SocialCard() {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  const classes = useStyles();
  var post = "POST";
  return (
    <MuiThemeProvider theme={theme}>
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar src={tty} className={classes.avatar}>
          </Avatar>
        }
        action={
          <div>
        <IconButton>
          <ThumbUp color="secondary"/>
        </IconButton>
        <IconButton >
          <Comment color="secondary"/>
        </IconButton></div>
        }
        title={<Input justifyContent="center" placeholder="YOUR TITLE" disableUnderline="true"/>}
        subheader={<Input disabled defaultValue={dateTime} disableUnderline="true"/>}
      />
      <CardMedia src={tty} image={tty} className={classes.media}>
      </CardMedia>
    </Card>
    </MuiThemeProvider>
  );
}

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
        showFullscreenButton: false,
        showGalleryFullscreenButton: false,
        showPlayButton: false,
        showGalleryPlayButton: false,
        showNav: true,
        isRTL: false,
        slideDuration: 450,
        slideInterval: 2000,
        slideOnThumbnailOver: false,
        thumbnailPosition: "bottom",
        showVideo: {},
        photos: [],
			  saved: [],
        stopPropagation: false,
        handleLike: async (src, toc, selected) => {
          if (this.state.images[selected].liked === false)
          {
            const imgobj = {
              src,
              toc,
              selected,
              liked: true
            }
            await this.state.saved.push(imgobj)
            this.state.images[selected].liked = true;
            await this.setState(this.state)
            return (imgobj);
          }
          else {
            for (let i in this.state.saved) {
              if (this.state.selected === this.state.saved[i].selected) {
                await delete this.state.saved[i];
                let saved = await this.state.saved.filter((el) => {
                  return el != null;
                })
                this.state.images[selected].liked = false;
                await this.setState({
                  saved
                })
                break;
              }
            }
          }
          return null;
        }
      };
      }

      async onSlideEvent(event) {
        await this.setState({
          selected: event,
          selectedTime: this.state.images[event].timeStamp,
          currentPic: await this.state.photos[event]
        })
      }
    
    async updateCurrent(pic, now) {
      await this.setState({
        currentPic: pic,
        selectedTime: now,
        total: this.state.total + 1,
      })
      await this.setState({
        selected: this.state.total
      })
    }
    
    getCurrentIndex() {
      return this.state.currentIndex;
    }

    setRef = webcam => {
        this.webcam = webcam;
      };

      setRef2 = imageGallery => {
        this._imageGallery = imageGallery;
      }

      _onImageClick(event) {
        console.debug('clicked on image', event.target, 'at index', this._imageGallery.getCurrentIndex());
      }

      _onImageLoad(event) {
        console.debug('loaded image', event.target.src);
      }
    
      _onPause(index) {
        console.debug('paused on index', index);
      }
    
      capture = async () => {
        let picture = await this.webcam.getScreenshot();
        if (picture === null) {
          return;
        }
        const now = new Date().toLocaleString();
        let newpic = {
          orignal: picture,
          thumbnail: picture,
          timeStamp: now,
          liked: false
        };
        await this.state.photos.push(picture);
        await this.state.images.push(newpic);
        // this.setState({
          // 	iamges: newpic
          // })
        await this.updateCurrent(picture, now);
        await this.setState(this.state);
        };
    
      render() {
        const videoConstraints = {
          width: 1280,
          height: 720,
          facingMode: "user",
        };
        
        const renderMobileImages = (
          <div style={styles.mobileGallery}>
     <ImageGallery
     ref={this.setRef2}
     items={this.state.images}
     lazyLoad={false}
     onImageLoad={this._onImageLoad}
     infinite={this.state.infinite}
     showBullets={false}
     showThumbnails={this.state.showThumbnails}
     showIndex={true}
     showNav={this.state.showNav}
     isRTL={false}
     showFullscreenButton={false}
     showGalleryFullscreenButton={false}
     showPlayButton={false}
     showGalleryPlayButton={false}
     onSlide={this.onSlideEvent.bind(this)}
     slideDuration={parseInt(this.state.slideDuration)}
     slideInterval={parseInt(this.state.slideInterval)}
     slideOnThumbnailOver={this.state.slideOnThumbnailOver}
     thumbnailPosition={this.state.thumbnailPosition}
     stopPropagation={this.state.stopPropagationt}
     additionalClass="app-image-gallery"/>
     <ImageGallery/>
     <SocialCard position="center"/>
     </div>
        );

  return(
          
      <MuiThemeProvider theme={theme}>
     <div style={styles.container}>
       <div style={styles.Webcam}>
       <Webcam
         audio={false}
         height={400}
         ref={this.setRef}
         screenshotFormat="image/jpeg"
         width={400}
         videoConstraints={videoConstraints}
       ></Webcam>
       
     <div style={styles.button}>
   <IconButton variant="raised" color="secondary" component="span" onClick={this.capture}>
     <PhotoCamera />
   </IconButton>
     </div>
     </div>
     {/* <ImageGallery
     ref={this.setRef2}
     items={this.state.images}
     lazyLoad={false}
     onImageLoad={this._onImageLoad}
     infinite={this.state.infinite}
     showBullets={this.state.showBullets}
     showThumbnails={this.state.showThumbnails}
     showIndex={true}
     showNav={this.state.showNav}
     isRTL={false}
     showFullscreenButton={this.state.showFullscreenButton}
     showGalleryFullscreenButton={this.state.showGalleryFullscreenButton}
     showPlayButton={this.state.showPlayButton}
     showGalleryPlayButton={this.state.showGalleryPlayButton}
     onSlide={this.onSlideEvent.bind(this)}
     slideDuration={parseInt(this.state.slideDuration)}
     slideInterval={parseInt(this.state.slideInterval)}
     slideOnThumbnailOver={this.state.slideOnThumbnailOver}
     thumbnailPosition={this.state.thumbnailPosition}
     stopPropagation={this.state.stopPropagation}
     additionalClass="app-image-gallery"/>
     <ImageGallery/>
     <SocialCard
     position="center"/>*/}
     </div>
     <div>{renderMobileImages}</div>
     </MuiThemeProvider>
   );
      }
      
}

/*ADD CODE FOR MOBILE SWIPING ON GALLERY */

export default (WebcamCapture);