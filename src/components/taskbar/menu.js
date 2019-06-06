import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles =  createMuiTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
        main: '#33bfff',
    }
},
});

class MenuButton extends React.Component {
  state = {
    anchorEl: null
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    /* const { classes } = this.props; */
    const { /* auth, */ anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const Wrapper = this.props.iconType;
    const listItems = this.props.items.map((link) =>
      <MenuItem onClick={this.handleClose} >{link}</MenuItem>
    );

    return (
      <div>
        <MuiThemeProvider theme={styles}>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="secondary"
        >
          {<Wrapper />}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            color: 'primary',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            color: 'primary',
          }}
          open={open}
          onClose={this.handleClose}
        >
        {listItems}


        </Menu>
        </MuiThemeProvider>
      </div>
    );
  }

}

export default MenuButton;