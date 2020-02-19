import React, {Component} from 'react';
import './note.component.css';

class NoteComponent extends Component {
    render() {
        return (
            <div className='note-item'>
                <h2>{this.props.note.title}</h2>
                <p style={{color: this.props.note.color}}>{this.props.note.note}</p>
            </div>
        );
    }
}

export default NoteComponent;
