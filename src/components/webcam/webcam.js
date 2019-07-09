import './webcam.css'
import React from 'react';
import Webcam from 'react-webcam';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { withFirebase } from '../firebase';
import ImageCard from './grid';
import { withAuthorization, AuthUserContext } from '../session';
import { compose } from 'recompose';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

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


class MyCamera extends React.Component{
	constructor (props)
	{
		super(props)
		this.state = {
			showIndex: false,
			showBullets: false,
			infinite: true,
			showThumbnails: true,
			showFullscreenButton: false,
			showGalleryFullscreenButton: false,
			showNav: false,
			slideOnThumbnailOver: false,
			showPlayButton: false,
			thumbnailPosition: 'bottom',
			selected: -1,
			total: -1,
			selectedTime: null,
			currentPic: null,
			photos: [],
			saved: [],
			images: [],
			loading: false,
			text: '',
			handleLike: async ( src, toc, selected, authUser ) => {
				const iId = toc.replace(/\//g, '-').replace(/PM|AM/g, '') + authUser.uid.slice(0-7);
				if (this.state.images[selected].liked === false)
				{
					const imgobj = {
						src,
						toc,
						selected,
						liked: true
					}
					const newimg = {
						iid: iId,
						title: window.prompt("Enter a title for your new image", iId),
						src,
						toc,
						likes: 1,
						comments: [{
							text: window.prompt("Enter a Description", "Whaterver you want <3"),
							userId: authUser.uid,
							time: new Date().toLocaleString() 
						},],
					}
					await this.state.saved.push(imgobj)
					this.state.images[selected].liked = true;
					this.props.firebase
						.doAddLiked(newimg);
					await this.setState(this.state)
					return (imgobj);
				}
				else {
					this.props.firebase.doRemoveLiked(iId);
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
		}
	}

	componentDidMount() {
		this.setState({ loading: true });

	}

	componentWillUnmount() {
		this.props.firebase.gallery().off();
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

	setRef = webcam => {
		this.webcam = webcam;
	  };
	
	setRef2 = imageGallery => {
		this._imageGallery = imageGallery;
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
			  width: 320,
			  heigh: 320,
			  facingMode: "user"
		  };
		  return (
				<MuiThemeProvider theme={theme}>
			  <AuthUserContext.Consumer>
				  {authUser => (
				<div className="MyCameraStart" style={{position: 'relative'}}>
					<div className="Smile">
						<Webcam
						audio={false}
						height={320}
						ref={this.setRef}
						screenshotFormat="image/jpeg"
						width={320}
						videoConstraints={videoConstraints}
						/>
					</div>
					<div style={{margin: 'auto', alignContent: 'center'}}>
						<IconButton variant="contained" color="secondary" disabled={false} onClick={this.capture}><PhotoCamera /></IconButton>
					</div>
					<div className="Gallery" style={{
						maxWidth: '750px',
						whiteSpace: 'auto',
						margin: 'auto',
					}}>
						<ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
							<ExpansionPanelSummary
                raised="3"
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="pnel1a-header"
							>Recent Gallery
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Container >
									<Grid container
										direction="column"
										justify="center"
										alignItems="center"
									>
										<Grid item style={{maxWidth: '658px'}}>
											<ImageGallery
												ref={this.setRef2}
												// onThumbnailClick={this._onThumbnailClick.bind(this)}
												items={this.state.images} 
												infinite={this.state.infinite}
												showBullets={this.state.showBullets}
												// onClick={this._onImageClick.bind(this)}
												showNav={this.state.showNav}
												showIndex={this.state.showIndex}
												slideOnThumbnailOver={this.state.slideOnThumbnailOver}
												thumbnailPosition={this.state.thumbnailPosition}
												showPlayButton={this.state.showPlayButton}
												showGalleryFullscreenButton={this.state.showGalleryFullscreenButton}
												showFullscreenButton={this.state.showFullscreenButton}
												additionalClass="app-image-gallery"
												onSlide={this.onSlideEvent.bind(this)}
												disableSwipe={true}
											/>
										</Grid>
										<Grid item >
                      <ImageCard 
												src={!this.state.currentPic ? null : this.state.currentPic}
												timeStamp={this.state.selectedTime}
												selected={this.state.selected}
												liked={this.state.selected === -1 ? null : this.state.images[this.state.selected].liked }
												handleLike={this.state.handleLike}
												authUser={authUser}
											/>
										</Grid>
									</Grid>
								</Container>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</div>
				</div>
				)}
				</AuthUserContext.Consumer>
				</MuiThemeProvider>
		  	);
	 	 }
}

const condition = authUser => !!authUser;



export default compose(
	withFirebase,
	withAuthorization(condition),
)(MyCamera);