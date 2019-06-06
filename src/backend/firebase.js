import Firebase from 'firebase';

var firebaseConfig = {
  apiKey: "",
  authDomain: "camagru-4aee6.firebaseapp.com",
  databaseURL: "https://camagru-4aee6.firebaseio.com",
  projectId: "camagru-4aee6",
  storageBucket: "camagru-4aee6.appspot.com",
  messagingSenderId: "390745305099",
  appId: "1:390745305099:web:d0931f0f0de358aa"
};
// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);

  export default app;
