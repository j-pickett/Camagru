import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/firebase';

const root = document.getElementById('root');

ReactDOM.render(
<FirebaseContext.Provider value={new Firebase()}>
<App />
</FirebaseContext.Provider>, root);

serviceWorker.unregister();
