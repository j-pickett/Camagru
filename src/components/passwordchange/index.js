import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
  }
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
        <div style={styles.card}>
        <div style={styles.wrap}>
        <Card
        display="flex"
        rounded="true"
        >
        <CardContent>
          
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
        disabled={isInvalid} type="submit"
        variant="contained"
        color="primary"
        size="medium"
        >
          Reset My Password
        </Button>
        </CardContent>
        </Card>
        </div></div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);