import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../firebase';
import * as ROUTES from '../constants/routes';
import { Button, Input, Card } from '@material-ui/core';

function PasswordForgetPage (){
  return (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
  );
};

const styles = {
  button: {
    type: "submit",
    variant: "contained",
    size: "medium",
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: '0',
    borderRadius: '3',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    float: "center",
    rounded: "true",
  },
};

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
    <Card style={styles.card} >
      <form onSubmit={this.onSubmit}>
        <Input
          style={{ float: 'center', width: "50%"}}
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Button 
        style={styles.button} disabled={isInvalid}>
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
      </Card>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };