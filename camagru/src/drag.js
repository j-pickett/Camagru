import React from 'react';
import PropTpyes from 'prop-types';
//import { returnStatement } from '@babel/types';
//import Draggable from 'react-draggable';

export default class Draggable extends React.Component{
    drag = (e) => {
        e.dataTransfer.setData('transfer', e.target.id)
    }

    noAllowDrop = (e) => {
        e.stopPropagation();
    }

    render() {
        return (
            <div id={this.props.id} draggable="true" onDragStart={this.drag} onDragOver={this.noallowDrop} style={this.props.style}>
            {this.props.children}
            </div>
        );
    }
}

Draggable.PropTpyes = {
    id: PropTpyes.string,
    style: PropTpyes.object,
    children: PropTpyes.node,
}