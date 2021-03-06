import React, { Component } from 'react';
import { compose } from 'recompose';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Save';
import CommentIcon from '@material-ui/icons/Comment';
import SettingsIcon from '@material-ui/icons/Settings';
import CardHeader from '@material-ui/core/CardHeader';
import ButtonBase from '@material-ui/core/ButtonBase';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
	withAuthorization,
	withEmailVerification,
	AuthUserContext,
 } from '../session';
import { Switch, Route, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../firebase';
import { GridList, GridListTile } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const styles = {
  delete: {
    type: "submit",
    variant: "contained",
    size: "medium",
    background: 'linear-gradient(45deg, #FE6B8B 30%, #bb0a1e 90%)',
    border: '0',
    borderRadius: '3',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    rounded: "true",
  },
  edit: {
    type: "submit",
    variant: "contained",
    size: "medium",
    background: 'linear-gradient(50deg, #2c387e 20%, #33eaff 80%)',
    border: '0',
    borderRadius: '3',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    rounded: "true",
    textColor: "primary",
  },
}

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2c387e',
      },
      secondary: {
          main: '#33eaff',
      },
      progress: {
      },
  },
  });

const useStyles = makeStyles(theme => ({
    messages: {
        width: "70%",
        position: "center",
        margin: "auto",
      },
	card: {
        margin: "auto",
        width: "25vh",
        position: "center",
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
      button: {
        type: "submit",
        variant: "contained",
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: '0',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        width: "10vh",
        height: "5vh",
        rounded: "true",
        textColor: "primary",
      }
  }));


const ImageCard = ({ imageObject, authUser }) => {
	const classes = useStyles();
	let desc = imageObject.comments[0].text;
	const otit = imageObject.title;
	// let oUid = imageObject.uid;


	return (
		<Card className={classes.card} className={{height: '490px'}}>
      <CardHeader
        action={
			<IconButton aria-label="Settings" component={Link} to={{
				pathname: `${ROUTES.HOME}/${imageObject.uid}`,
				state: { imageObject, authUser },
			}}>
            <SettingsIcon />
          </IconButton>
		}
		className={{whiteSpace: 'nowrap', fontSize: '1em'}}
        title={otit ? otit.length > 28 ? otit.substr(0, 28) + "..." : otit : null}
		/>
      <CardMedia className={classes.media}
		image={imageObject.src}
		title={imageObject.toc}
		/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={{wordWrap: 'none',}}>
          {desc ? desc.length > 150 ? (desc.substr(0, 150) + "...") : (desc) : "You can edit this field in the picture settings!" }
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={{display: 'inline-flex', position: 'absolute', bottom: 0, right: '33%'}}>

		<IconButton aria-label="Add to favorites" 
			// onClick={() => {
				
				// if (window.confirm('Are you sure you want to delete the picture? you can not have it back.')){
					// 	return delPicture(imageObject, authUser);
					// }
					// }}
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
			  pathname: `${ROUTES.HOME}/${imageObject.uid}`,
			  state: { imageObject, authUser },
		  }}>
          <CommentIcon />
		  <div className={{padding: `2px`}}>
		  	{imageObject.comments.length - 1}
		  </div>
        </IconButton>
      </CardActions>
    </Card>
	);
}

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

class HomeHome extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        users: null,
      };
    }
  
    componentDidMount() {
      this.props.firebase.users().on('value', snapshot => {
        this.setState({
          users: snapshot.val(),
        });
      });
    }
  
    componentWillUnmount() {
      this.props.firebase.users().off();
    }
  
    render() {
      return (
        <AuthUserContext.Consumer>		

        <div>
          <h1>Home Page</h1>
          <p>The Home Page is accessible by every signed in user.</p>
		{authUser => (
			<Images authUser={authUser} />
		)}
          <Messages users={this.state.users} />
        </div>
        </AuthUserContext.Consumer> 
      );
    }
  }

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
			<CardContent>
				<div>
					{loading && <div>Loading ...</div>}

					{messages ? (
						<Card>
							<CommentList messages={messages} />
						</Card>
						) : (
							<div> There are no messages ... </div>
							)}
							<TextField id="CommentBox" labal="Leave a comment <3" multiline fullWidth
								onChange={this.onChangeText} value={text} />
								 <ButtonBase onClick={this.onCreateComment}> Submit </ButtonBase>
					{/* <form onSubmit={this.onCreateComment}>
						<input type="text" value={text} onChange={this.onChangeText} />
						<button type="submit"> Send </button>
					</form> */}
				</div>
			</CardContent>
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

	const iconAction = () => (
		<IconButton aria-label="Settings" onClick={ async () => {
			if (window.confirm("would you like to save something?")){
				if(window.confirm("What would you like to update? Y = Desc n Title | N = more options ")){
					await doUpdateDesc(values.multiline);
					await doUpdateUid(values.title);
				} else {
					if (window.confirm("Update title?")){
						await doUpdateUid(values.title);
					} else {
						if (window.confirm("Update Desc?")){
							await doUpdateDesc(values.multiline);
						} else {
							return ;
						}
					}
				}
			} else {
				return ;
			}

		}
			}>
			<SaveIcon />
		</IconButton>
	)

	return(
		<div>
			<Grid container>
				<Card className={classes.pageMain} className={{minWidth: '100%'}}>
					<CardHeader action={iconAction()} title={
						<TextField id="Title" label="Title {Limit : 28 Characters}" fullWidth onChange={handleChange('title')} value={values.title} />
					}/>
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
						{/* <Typography variant="body2" component="p"> */}
						<TextField
							id="Description Box" label="Description" multiline fullWidth rowsMax="4"
							value={values.multiline} onChange={handleChange('multiline')}
							className={classes.textField} margin="normal"
							variant="filled"
						/>

						<Grid container>

							<Card className={classes.commentMain} className={{minWidth: '98%', alignSelf: 'center'}} >
								<Comments  imageObject={imageObject} authUser={authUser}/>
							</Card>
						</Grid>
							{`${imageObject.comments[0].text}`}
						
					</CardContent>
				{/* This is where i would map the comments by comment order giving timestamp and metadata */}
				</Card>
			</Grid>
		</div>
	);
	}
// const MainCard = withStyles(useStyles)(MainCardBase);

const HomePage = () => {

	return(
			<div>
				<h1>Home Page</h1>
					<p>The Home Page is Avaialbe to Signed In Users Only</p>
				<Switch>
					<Route exact path={ROUTES.HOME} component={Home} />
					<Route exact path={ROUTES.MYIMAGE} component={SinglePage} />
				</Switch>
			</div>
)};

const ImageList = ({ images, authUser, firebase }) => {
	const classes = useStyles();

	//  const refresh = () => {
	// 	firebase.gallery(authUser.uid).child(image.uid).set(null);

	//  }

	return(
		<div>
			 <GridList cellHeight={180} className={classes.gridList}>
			{images.map(image => 
				image.src ? (
				<GridListTile key={image.uid} cols={2} className={{ height: 'auto' }}>
					<Box border={2} classes={{ root: classes.images }}>
						<ImageCard imageObject={image} authUser={authUser} />
					</Box>
				</GridListTile>
				// <Grid item >
				// </Grid>
			) : (null)
				)}
			</GridList>
		</div>
	);
}

// const ImageItem = ({ imageObject }) => (
// 	<div>
// 		<ImageCard imageObject={imageObject} />
// 	</div>
// );

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

	// doUpdateDesc = event => {
	// 	this.state.firebase.updateDesc(this.state.authUser.uid, this.state.imageObject.uid, event.target.value);
	// }

	componentDidMount() {
		if (this.state.imageObject) {
			return;
		}
		this.setState({ loading: true });

		this.props.firebase
			.image(this.props.match.params.id)
			.on('value', snapshot => {
				this.setState({
					imageObject: snapshot.val(),
					loading: false,
				});
			});
	}

	componentWillUnmount() {
		this.props.firebase.image(this.props.match.params.id).off();
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
					const user_pics = imgList.filter(image => this.props.authUser.uid === image.comments[0].userId);
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
		const { text, images, loading } = this.state;

		return(
			<AuthUserContext.Consumer>
				{authUser => (
					<div>
						{loading && <div>Loading ...</div>}
						{images ? (
							<ImageList images={images} authUser={authUser} firebase={this.props.firebase}/>
						) : (
							<div>There are no images ...</div>
						)}

						<form onSubmit={event => this.onCreateMessage(event, authUser)}>
							<input
								type="text"
								value={text}
								onChange={this.onChangeText}
							/>
							<button type="submit">Send</button>
						</form>
					</div>
			)}
			</AuthUserContext.Consumer>
		);
	}

}

class MessagesBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        text: '',
        loading: false,
        messages: [],
        limit: 5,
      };
    }
  
    componentDidMount() {
      this.onListenForMessages();
    }
  
    onListenForMessages = () => {
      this.setState({ loading: true });
  
      this.props.firebase
        .messages()
        .orderByChild('createdAt')
        .limitToLast(this.state.limit)
        .on('value', snapshot => {
          const messageObject = snapshot.val();
  
          if (messageObject) {
            const messageList = Object.keys(messageObject).map(key => ({
              ...messageObject[key],
              uid: key,
            }));
  
            this.setState({
              messages: messageList,
              loading: false,
            });
          } else {
            this.setState({ messages: null, loading: false });
          }
        });
    };
  
    componentWillUnmount() {
      this.props.firebase.messages().off();
    }
  
    onChangeText = event => {
      this.setState({ text: event.target.value });
    };
  
    onCreateMessage = (event, authUser) => {
      this.props.firebase.messages().push({
        text: this.state.text,
        userId: authUser.uid,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
      });
  
      this.setState({ text: '' });
  
      event.preventDefault();
    };
  
    onEditMessage = (message, text) => {
      this.props.firebase.message(message.uid).set({
        ...message,
        text,
        editedAt: this.props.firebase.serverValue.TIMESTAMP,
      });
    };
  
    onRemoveMessage = uid => {
      this.props.firebase.message(uid).remove();
    };
  
    onNextPage = () => {
      this.setState(
        state => ({ limit: state.limit + 5 }),
        this.onListenForMessages,
      );
    };
  
    render() {
      const { users } = this.props;
      const { text, messages, loading } = this.state;
      const classes = useStyles();
      return (
        <MuiThemeProvider theme={theme}>
        <AuthUserContext.Consumer>
          {authUser => (
            <div>
              {!loading && messages && (
                <Button class onClick={this.onNextPage}>
                  More
                </Button>
              )}
  
              {loading && <div><CircularProgress color="secondary"/></div>}
  
              <div className={classes.messages}>
              <Card
          display="flex"
          rounded="true"
          
          >
          <CardContent>
              {messages && (
                <MessageList
                  messages={messages.map(message => ({
                    ...message,
                    user: users 
                      ? users[message.userId]
                      : { userId: message.userId },
                  }))}
                  onEditMessage={this.onEditMessage}
                  onRemoveMessage={this.onRemoveMessage}
                />
              )}
              {!messages && <div>There are no messages ...</div>}
              </CardContent>
          </Card>
          </div>
          <br/>
  
                <div className={classes.card}>
                <Card>
                <CardContent>
                 <InputBase
                 placeholder="type a message"
                  type="text"
                  value={text}
                  onChange={this.onChangeText}>
                  </InputBase>
                  <Button onClick={event =>this.onCreateMessage(event, authUser)} class>Send</Button>
               </CardContent>
              </Card>
              </div>
              <br/>
            </div>
            
          )}
        </AuthUserContext.Consumer>
        </MuiThemeProvider>
      );
    }
  }
  
  const MessageList = ({
    messages,
    onEditMessage,
    onRemoveMessage,
  }) => (
    <ul className={{ listStyleType: "none" }}>
      {messages.map(message => (
        <MessageItem
          key={message.uid}
          message={message}
          onEditMessage={onEditMessage}
          onRemoveMessage={onRemoveMessage}
        />
      ))}
    </ul>
  );
  
  class MessageItem extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        editMode: false,
        editText: this.props.message.text,
      };
    }
  
    onToggleEditMode = () => {
      this.setState(state => ({
        editMode: !state.editMode,
        editText: this.props.message.text,
      }));
    };
  
    onChangeEditText = event => {
      this.setState({ editText: event.target.value });
    };
  
    onSaveEditText = () => {
      this.props.onEditMessage(this.props.message, this.state.editText);
  
      this.setState({ editMode: false });
    };
  
    render() {
      const { message, onRemoveMessage } = this.props;
      const { editMode, editText } = this.state;
  
      return (
        <li>
          {editMode ? (
            <Paper>
            <InputBase
              type="text"
              value={editText}
              onChange={this.onChangeEditText}
            />
            </Paper>
          ) : (
            <span>
              <strong style={{ color: 'hotPink' }}>
                {message.user.username || message.user.userId}
              </strong>{' '}
              {message.text} {message.editedAt && <span>(Edited)</span>}
            </span>
          )}
  
          {editMode ? (
            <span>
              <Button class onClick={this.onSaveEditText}>Save</Button>
              <Button class onClick={this.onToggleEditMode}>Reset</Button>
            </span>
          ) : (
            <Button style={styles.edit} onClick={this.onToggleEditMode}><EditIcon/></Button>
          )}
  
          {!editMode && (
            <Button style={styles.delete}
              onClick={() => onRemoveMessage(message.uid)}
            >
              <DeleteIcon/>
            </Button>
          )}
        </li>
      );
    }
  }
  
const Messages = withFirebase(MessagesBase);
const Comments = withFirebase(CommentBase);
const Home = withFirebase(HomeHome);
const Images = withFirebase(ImagesBase);

const condition = authUser => !!authUser;

const SinglePage = withFirebase(SinglePageBase);
export default compose(
	withEmailVerification,
	withAuthorization(condition),
)(HomePage);