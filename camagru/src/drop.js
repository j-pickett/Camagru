import React from 'react';
import PropTpyes from 'prop-types';

export default class Droppable extends React.Component{
    drop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('transfer');
        e.target.appendChild(document.getElementById(data));
    }

    allowDrop = (e) => {
        e.preventDefault();
    }

    render(){
        return (
            <div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop} style={this.props.style}>
            {this.props.children}
            </div>
        );
    }
}

Droppable.PropTpyes = {
    id: PropTpyes.string,
    style: PropTpyes.object,
    children: PropTpyes.node,
}