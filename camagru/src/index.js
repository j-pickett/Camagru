import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Webcam from './webcam';
import * as serviceWorker from './serviceWorker';
//import Draggable from 'react-draggable';
//import Gallery from './gallery'

const cam = document.getElementById('webcam-container');
const root = document.getElementById('root');
//const gallery = document.getElementById('gallery');

//ReactDOM.render(<Drag /> , root);
//ReactDOM.render(<Drop /> , root);
ReactDOM.render(<App />, root);
ReactDOM.render(<Webcam />, cam);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
