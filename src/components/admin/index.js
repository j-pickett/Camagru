import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../firebase';
import { withAuthorization, withEmailVerification } from '../session';
import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

/* mobile ready */
const AdminPage = () => (
  <div>
    <h1>Admin Page</h1>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

const styles = {
  wrap: {
    textAlign: "left",
    width: "95%",
    margin: 'auto',
  },
  color: {
    color: "#2c387e",
  },
  color2: {
    color: "#33eaff",
  },
  color3: {
    color: "hotPink",
  },
};

class UserListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
      <div>
        <h2>Users</h2>
        {loading && <div> <CircularProgress color="secondary"/> </div>}

        
        <ul style={{ listStyleType: "none", paddingLeft: "0", paddingRight: "10px"}}>
          {users.map(user => (
            <div style={styles.wrap}>
              <Card
        display="flex"
        rounded="true"
        >
        <CardContent>
            <li key={user.uid} >
              <span>
                <strong style={styles.color}>ID:</strong> {user.uid}
              </span>
              <span>
                <strong style={styles.color2}> E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong style={styles.color3}> Username:</strong> {user.username}
              </span>
            </li>
            </CardContent>
            </Card>
            </div>
          ))}
        </ul>
        <br></br>
        </div>
        </MuiThemeProvider>
    );
  }
}

class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div> <CircularProgress color="secondary"/> </div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
      </MuiThemeProvider>
    );
  }
}

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage);