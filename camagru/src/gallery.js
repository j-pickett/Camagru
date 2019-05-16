import React from 'react';
import cash from './cash.jpg';
import grillz from './grillz.jpeg'
import tty from './tty.png';
import parrot from './parrot.png';
import hat from './hat.jpg';
import './App.css';

function Gallery() {
    return (
        <div className="Gallery">
        <header className="Gallery-header">
        <img src={tty} className="App-gallery" alt="tty" />
        <img src={parrot} className="App-gallery" alt="parrot" />
        <img src={hat} className="App-gallery" alt="hat" />
        <img src={grillz} className="App-gallery" alt="grillz" />
        <img src={cash} className="App-gallery" alt="cash" />
        </header>
        </div>
    );
}

export default Gallery;