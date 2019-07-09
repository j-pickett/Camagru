import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Comment from '@material-ui/icons/Comment';
import CommentList from './commentlist';
const useStyles = makeStyles(theme => ({
  card: {
  maxWidth: "40vw",
  flexGrow: "1",
  raised: 24,
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
    display: "flex",
    transform: 'rotate(180deg)',
  },
  avatar: {
    backg4roundColor: red[500],
  },
  collapseContent: {
    height: "0vh",
  },
}));

const ImageCard = ({src, timeStamp, selected, liked, handleLike, authUser }) =>  {
  const [expanded,] = React.useState(false);
	const imgToHandle = src;
	const newtime = timeStamp;
	const classes = useStyles();


	if (!imgToHandle) return null;
	return (
    <div flexGrow="1" align="center">
		<Card className={classes.card}>
      <CardHeader
        action={
			<IconButton aria-label="Settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Currently Selected"
        subheader={newtime}
		/>
      <CardMedia
        className={classes.media}
        image={imgToHandle}
        title="Is u"
		/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Like Comment and all that shit
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
		<IconButton aria-label="Add to favorites" 
			onClick={() => {
				handleLike(imgToHandle, newtime, selected, authUser)}}
			color={liked ? 'primary' : 'default' }
		>
          <ThumbUp />
        </IconButton>
        <IconButton aria-label="Share">
          <Comment />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent >
          <Typography >
            <CommentList />
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}


export default ImageCard;