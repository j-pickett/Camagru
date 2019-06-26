import FireBaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };



  class Firebase {
    constructor() {
      FireBaseApp.initializeApp(firebaseConfig);
      this.auth = FireBaseApp.auth();
      this.db = FireBaseApp.database();
      this.serverValue = FireBaseApp.database.ServerValue;
      this.emailAuthProvider = FireBaseApp.auth.EmailAuthProvider;
      this.googleProvider = new FireBaseApp.auth.GoogleAuthProvider();
      this.facebookProvider = new FireBaseApp.auth.FacebookAuthProvider();
      this.twitterProvider = new FireBaseApp.auth.TwitterAuthProvider();
    };
    
    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
}
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
};
            next(authUser);
          });
      } else {
        fallback();
} });

doCreateUserWithEmailAndPassword = (email, password) =>
this.auth.createUserWithEmailAndPassword(email, password);

doSignInWithEmailAndPassword = (email, password) =>
this.auth.signInWithEmailAndPassword(email, password);

doSignInWithGoogle = () =>
this.auth.signInWithPopup(this.googleProvider);

doSignInWithFacebook = () =>
this.auth.signInWithPopup(this.facebookProvider);

doSignInWithTwitter = () =>
this.auth.signInWithPopup(this.twitterProvider);

doSignOut = () => this.auth.signOut();

doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

doSendEmailVerification = () =>
this.auth.currentUser.sendEmailVerification({
  url: "https://shielded-coast-68814.herokuapp.com",
});

doPasswordUpdate = password =>
this.auth.currentUser.updatePassword(password);

// *** Merge Auth and DB User API *** //

onAuthUserListener = (next, fallback) =>
this.auth.onAuthStateChanged(authUser => {
  if (authUser) {
    this.user(authUser.uid)
      .once('value')
      .then(snapshot => {
        const dbUser = snapshot.val();

        // default empty roles
        if (!dbUser.roles) {
          dbUser.roles = [];
        }

        // merge auth and db user
        authUser = {
          uid: authUser.uid,
          email: authUser.email,
          emailVerified: authUser.emailVerified,
          providerData: authUser.providerData,
          ...dbUser,
        };

        next(authUser);
      });
  } else {
    fallback();
  }
});

// *** User API ***

user = uid => this.db.ref(`users/${uid}`);

users = () => this.db.ref('users');

// *** Message API ***

message = uid => this.db.ref(`messages/${uid}`);

messages = () => this.db.ref('messages');
}

export default Firebase