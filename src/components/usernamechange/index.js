import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    width: "60vw",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    margin: "auto",
  },
  button: {
    type: "submit",
    variant: "contained",
    size: "medium",
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: '0',
    borderRadius: '3',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    rounded: "true",
  },
};


class UsernameChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      error: null,
      nameObject: null,
			 doUpdateDesc: txt => {
         let {username} = this.state
				this.props.firebase.updateUsername(this.state.username.uid, txt);

				this.setState({ username });
			},
    };
  }
  
  render() {
    const { username, error } = this.state;
  
    const isInvalid = username === '';

    return (
      <Card style={styles.card}>
      <CardContent>
      <form style={{width: "500px", height: "100"}}>
          
        <Input
          name="username"
          value={username}
          onChange={this.onChange}
          type="Username"
          placeholder="Change Your Username"
        />
        <Button
        onClick={this.state.doUpdateDesc(username)}
        style={styles.button}
        disabled={isInvalid}
        >
          Change My Username
        </Button>

        {error && <p>{error.message}</p>}
      </form>
      </CardContent>
        </Card>
    );
  }
}

export default withFirebase(UsernameChangeForm);