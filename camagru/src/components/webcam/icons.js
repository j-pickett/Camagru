import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const styles =  createMuiTheme({
    palette: {
      secondary: {
          main: '#33eaff'
      }
  },
  input: {
    display: 'none',
  },
});

function IconButtons(props) {
  const { classes } = props;
  return (
    <div>
      <label htmlFor="icon-button-file">
      <MuiThemeProvider theme={styles}>
        <IconButton variant="raised" color="secondary" className={classes.button} component="span">
          <PhotoCamera />
        </IconButton>
        </MuiThemeProvider>
      </label>
    </div>
  );
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButtons);
