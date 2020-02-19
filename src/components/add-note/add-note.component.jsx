import React, {Component} from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import './add-note.component.css';

class AddNoteComponent extends Component {

    state = {
        title: '',
        note: '',
        colorPickerToggled: false,
        colorsList: [
            {name: 'text-color-black.svg', value: '#000000'},
            {name: 'text-color-orange.svg', value: '#F5A623'},
            {name: 'text-color-blue.svg', value: '#007AFF'},
            {name: 'text-color-green.svg', value: '#00BE7C'},
            {name: 'text-color-red.svg', value: '#D52842'}
        ],
        color: {},
    };

    componentDidMount() {
        this.setState({color: this.state.colorsList[0]})
    }

    setData = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
          title: this.state.title,
          note: this.state.note,
          color: this.state.color.value
        };
        this.props.onAddNote(data);
        this.setState({title: '', note: '', color: this.state.colorsList[0]});
    };

    openColorPicker = () => {
        this.setState({colorPickerToggled: !this.state.colorPickerToggled});
    };

    isColorPickerToggled = () => {
        return this.state.colorPickerToggled ? 'show' : 'hidden';
    };

    renderColorsList = () => {
        const colors = this.state.colorsList.filter(color => color.value !== this.state.color.value);
        return colors.map(color => (
            <img src={'assets/colors/' + color.name} key={color.value} onClick={() => this.setColor(color)}/>
        ));
    };

    setColor = (color) => {
        this.setState({color, colorPickerToggled: false});
    };

    render() {
        return (
            <div className='add-note'>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.setData} name='title' value={this.state.title} className='add-note__title' placeholder='Add title'/>
                    <TextareaAutosize onChange={this.setData} name='note' value={this.state.note} className='add-note__note' placeholder='Add note' style={{color: this.state.color.value}}/>
                    <div className='add-note__color-wrapper'>
                        <div className={'add-note__color-picker ' + this.isColorPickerToggled()}>
                            {this.renderColorsList()}
                        </div>
                        <span className='add-note__selected-color' onClick={this.openColorPicker}>
                            <img src={'assets/colors/' + this.state.color.name} />
                        </span>
                    </div>
                    <button className='add-note__submit' type='submit'>Done</button>
                </form>
            </div>
        );
    }
}

export default AddNoteComponent;
