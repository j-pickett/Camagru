import React, { Component } from 'react';
import { compose } from 'recompose';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import CardHeader from '@material-ui/core/CardHeader';
import Badge from '@material-ui/core/Badge';

import {
	withAuthorization,
	withEmailVerification,
	AuthUserContext,
 } from '../session';
import { Switch, Route, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../firebase';
import { GridList, GridListTile, CircularProgress } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Button} from '@material-ui/core';

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


  const styles = {
	paper: {
		rounded: true,
		width: "30vw",
		align: "center",
	},
	input: {
		width: "18vw",
	},
	button: {
		width: "6vw",
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(44, 56, 126, .3)',
      color: 'white',
      rounded: "true",
      variant: "contained",
      textColor: "primary",
	},
}

const useStyles = makeStyles(theme => ({
	card: {
	  minWidth: "25vw",
	  maxWidth: "25vw",
		height: 460,
		rounded: true,
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
	  backg4roundColor: red[500],
	},
	root: {
		paddingBottom: 5,
		outlineColor: 'black',
		justifyContent: 'center',
	},
	images: {
		maxWidth: 420,
		minWidth: 420,
		// position: "absolute",
		margin: "auto",
	},
	pageMain: {
		minWidth: '720vl',
	  	backgroundColor: 'white',
	},
	pageMedia: {
		height: 0,

		paddingTop: '56.25%',
	},

  }));


const ImageCard = ({ imageObject, authUser }) => {
	const classes = useStyles();
	let desc = imageObject.comments[0].text;
	const otit = imageObject.title;
	// let oUid = imageObject.uid;


	return (
		<Card className={classes.card} style={{height: '490px'}}>
      <CardHeader
		style={{whiteSpace: 'nowrap', fontSize: '1em'}}
        title={otit ? otit.length > 28 ? otit.substr(0, 28) + "..." : otit : null}
		/>
      <CardMedia className={classes.media}
		image={imageObject.src}
		title={imageObject.toc}
		/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{wordWrap: 'none',}}>
          {desc ? desc.length > 150 ? (desc.substr(0, 150) + "...") : (desc) : "You can edit this field in the picture settings!" }
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{display: 'inline-flex', position: 'absolute', bottom: 0, right: '33%'}}>

		<IconButton aria-label="Add to favorites" 
					color={ 'primary' }
					>
				<Badge badgeContent={imageObject.likes} >
        	<FavoriteIcon /> 
					</Badge>
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton
          component={Link} to={{
			  pathname: `${ROUTES.POSTS}/${imageObject.uid}`,
			  state: { imageObject, authUser },
		  }}>
          <CommentIcon />
		  <div style={{padding: `2px`}}>
		  	{imageObject.comments.length - 1}
		  </div>
        </IconButton>
      </CardActions>
    </Card>
	);
}

const HomeHome = () => (
	<AuthUserContext.Consumer>		
		{authUser => (
			<Images authUser={authUser} />
		)}
			</AuthUserContext.Consumer> 
)

const CommentList = ({ messages }) => (
	<ul>
		{messages.map(message => (
			<CommentItem key={message} message={message} />
		))}
	</ul>
)

const CommentItem = ({ message }) => (
	<li>
		<strong>{message.userId}</strong> {message.text}
	</li>
)

class CommentBase extends Component{
	constructor(props){
		super(props);

		this.state = {
			text: '',
			loading: false,
			messages: [],
		};
	}

	onChangeText = event => {
		this.setState({ text: event.target.value });
	};

	onCreateComment = () => {
		this.props.firebase.doWriteComment(this.props.imageObject.iid, this.state.text, this.props.authUser.uid);
		this.setState({ text: "" });
	}

	componentDidMount() {
		this.setState({ loading: true });

		this.props.firebase.comments(this.props.imageObject.iid)
			.on('value', snapshot => {
				const commentObject = snapshot.val();

				if (commentObject) {
					console.log(commentObject.length)

					this.setState({ 
						messages: commentObject,
						loading: false,
					});
				} else {
					this.setState({ messages: null, loading: false });
				}
			});
	}

	componentWillUnmount() {
		this.props.firebase.comments(this.props.imageObject.iid).off();
	}

	render () {
		const { text, messages, loading } = this.state;

		return (
			<MuiThemeProvider theme={theme}>
			<CardContent>
				<div>
					{loading && <div><CircularProgress color="secondary"/></div>}

					{messages ? (
						<Card>
							<CommentList messages={messages} />
						</Card>
						) : (
							<div> There are no messages ... </div>
							)}
							<TextField id="CommentBox" labal="Leave a comment <3" multiline fullWidth
								onChange={this.onChangeText} value={text} />
								 <Button style={styles.button} onClick={this.onCreateComment}> Submit </Button >
				</div>
			</CardContent>
			</MuiThemeProvider>
		)
	}

}

const MainCard = ({ authUser, imageObject, doUpdateDesc, doUpdateUid, doUpdateLike }) => {
	const classes = useStyles();

	const [values, setValues] = React.useState({
		name: '',
		title: '',
		multiline: '',
	});
	
		
	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
	  };


	return(
		<div align="center">
			<Grid container>
				<Card className={classes.pageMain} style={{minWidth: '100%'}}>
					<CardMedia className={classes.pageMedia} image={imageObject ? imageObject.src : null} title={imageObject ? imageObject.uid : null} />
					<IconButton aria-label="Add to favorites" 
						onClick={() => {doUpdateLike(imageObject);}}
								color={ 'primary' }
								>
							<Badge badgeContent={imageObject.likes} >
						<FavoriteIcon /> 
								</Badge>
					</IconButton>

					<CardContent>
						<TextField
							id="Description Box" label="Description" multiline fullWidth rowsMax="4"
							value={values.multiline} onChange={handleChange('multiline')}
							className={classes.textField} margin="normal"
							variant="filled"
						/>

						<Grid container>

							<Card className={classes.commentMain} style={{minWidth: '98%', alignSelf: 'center'}} >
								<Comments  imageObject={imageObject} authUser={authUser}/>
							</Card>
						</Grid>
							{`${imageObject.comments[0].text}`}
						
					</CardContent>
				</Card>
			</Grid>
		</div>
	);
	}

const ImagePage = () => {

	return(
			<div>
				<Switch>
					<Route exact path={ROUTES.POSTS} component={Home} />
					<Route exact path={ROUTES.POSTSID} component={SinglePage} />
				</Switch>
			</div>
)};

const ImageList = ({ images, authUser, firebase }) => {
	const classes = useStyles();

	return(
		<div align="center">
		<GridList cols={3} spacing={0} cellHeight={500} classes={{ root: classes.root }}>
		{images.map(image => 
			image.src ? (
			<GridListTile key={image.uid} style={{minWidth: `500px`}} >
					<ImageCard classes={{ root: classes.images }} imageObject={image} authUser={authUser} />
			</GridListTile>
		) : (null)
			)}
		</GridList>
	</div>
	);
}

class SinglePageBase extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			desc: '',
			loading: false,
			imageObject: null,
			doUpdateDesc: txt => {
				let { imageObject } = this.state;
				imageObject.comments[0].text = txt;
				this.props.firebase.updateDesc(this.state.imageObject.iid, txt);

				this.setState({ imageObject });
			},
			doUpdateUid: txt => {
				let { imageObject } = this.state;
				this.props.firebase.updateTitle(this.state.imageObject.iid, txt);
				imageObject.uid = txt;

				this.setState({ imageObject });
			},
			writeComment: txt => { 
				this.props.firebase.doWriteComment(this.state.imageObject.iid, txt, this.state.authUser.uid);
			},
			doUpdateLike: imageObject => {
				this.props.firebase.doOnLike(imageObject)
				imageObject.likes = imageObject.likes + 1;
					return (
						<MainCard />
					)
				
			},
			...props.location.state,
		};

	}


	componentDidMount() {
		if (this.state.imageObject) {
			return;
		}
		this.setState({ loading: true });

		this.props.firebase
			.gallery(this.props.match.params.id)
			.on('value', snapshot => {
				this.setState({
					imageObject: snapshot.val(),
					loading: false,
				});
			});
	}

	componentWillUnmount() {
		this.props.firebase.gallery(this.props.match.params.id).off();
	}

	render() {

		const { imageObject, doUpdateDesc, doUpdateUid, doUpdateLike } = this.state;

		return (
			<div>
				{!this.state.loading &&  <MainCard
					authUser={this.state.authUser}
					imageObject={imageObject} 
					doUpdateDesc={doUpdateDesc} 
					doUpdateUid={doUpdateUid}
					doUpdateLike={doUpdateLike}
					/>}
			</div>
		)}
	
}



class ImagesBase extends Component {
	constructor(props){
		super(props);

		this.state = {
			text: '',
			loading: false,
			messages: [],
			images: [],
			delPicture: ( imageObject ) => (this.props.firebase.doRemoveLiked(imageObject, this.props.authUser)),
		};
	}

	onChangeText = event => {
		this.setState({ text: event.target.value });
	};

	onCreateMessage = (event, authUser) => {
		this.props.firebase.messages().push({
			text: this.state.text,
			userId: authUser.uid,
		});

		this.setState ({ text: '' });

		event.preventDefault();
	}

	componentDidMount() {
		this.setState({ loading: true });

		this.props.firebase.gallery().on('value', snapshot => {
			const imageObject = snapshot.val();

			if (imageObject) {
				const imgList = Object.keys(imageObject).map(key => ({
					...imageObject[key],
					uid: key,
				}));
				const newList = () => {
					const toRemove = imgList.filter(image => !image.likes);
					if (toRemove){
						toRemove.map(image => this.props.firebase.gallery(this.props.authUser.uid).child(image.uid).set(null));
					}
					const user_pics = imgList.filter(image => this.props.firebase.gallery(this.props.authUser.uid));
					return user_pics.filter(image => image.likes);
				}
				this.setState ({
					images: newList(),
					loading: false,
				});
			} else {
				this.setState({ messages: null, laoding: false, images: null });
			}
		});
	}

	deletePicture = imgUid => {

		let imSrc = imgUid.src;
		let imToc = imgUid.toc;
		const del = window.confirm('Are you sure you want to delete the picture? you can not have it back.');
		if (del) {
			return this.props.firebase.doRemoveLiked({ imSrc, imToc }, this.props.authUser);
		} else {
			return ;
		}
	}

	componentWillUnmount() {
		this.props.firebase.gallery().off();
	}

	render() {
		const { images, loading } = this.state;

		return(
			<MuiThemeProvider theme={theme}>
			<AuthUserContext.Consumer>
				{authUser => (
					<div>
						{loading && <div><CircularProgress color="secondary"/></div>}
						{images ? (
							<ImageList images={images} authUser={authUser} firebase={this.props.firebase}/>
						) : (
							<div>There are no images ...</div>
						)}
					</div>
			)}
			</AuthUserContext.Consumer>
			</MuiThemeProvider>
		);
	}

}

const Comments = withFirebase(CommentBase);
const Home = withFirebase(HomeHome);
const Images = withFirebase(ImagesBase);

const condition = authUser => !!authUser;

const SinglePage = withFirebase(SinglePageBase);
export default compose(
	withEmailVerification,
	withAuthorization(condition),
)(ImagePage);