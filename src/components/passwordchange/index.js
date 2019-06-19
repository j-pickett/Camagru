import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const styles = {
  wrap: {
    maxWidth: 600,
    minWidth: 500,
  },
  card: {
    margin: "auto",
  width: "0%",
  position: "center",
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


class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div style={styles.wrap}>
          
        <Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <Button
        style={styles.button}
        disabled={isInvalid}
        >
          Change My Password
        </Button>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);