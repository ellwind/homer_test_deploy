import React, {Component} from "react";
import './add-content-button.component.css';

class AddContentButton extends Component {
    render() {
        return (
            <button className='add-content-button' onClick={this.props.toggleMenu}>
                <span className='add-content-button__add-sign'><img src='../assets/add.svg'/></span>
                <span>
                    Add any content
                </span>
            </button>
        )
    }
}

export default AddContentButton;
