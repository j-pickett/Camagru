import React from 'react';
import logo from '../images/tty.jpg';
import parrot from '../images/parrot.png';
import tty from '../images/tty.jpg'
import sea from '../images/undersea.jpg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <div className="Gallery">
        <img src={logo} className="App-logo" alt="logo" />
        <img src={parrot} className="Parrot" alt="parrot" />
        <img src={tty} className="Tty" alt="tty" />
        <img src={sea} className="Sea" alt="sea" /></div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
