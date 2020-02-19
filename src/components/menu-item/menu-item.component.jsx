import React, {Component} from 'react';
import './menu-item.component.css';

class MenuItemComponent extends Component {
    handler = () => {
        this.props.menuClicked(this.props.handler);
    };

    render() {
        return (
            <div className='menu-item' onClick={this.handler}>
                <img src={this.props.icon} />
                <p>{this.props.name}</p>
            </div>
        );
    }
}

export default MenuItemComponent;
