import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 750,
    maxHeight: 250,
  },
  paper: {
    padding: theme.spacing * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: 150,
    maxWidth: 300,
    minHeight: 150,
    maxHeight: 300,
  },
});

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Paper className={classes.paper} />
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.paper} />
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.paper} />
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.paper} />
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.paper} />
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.paper} />
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);
