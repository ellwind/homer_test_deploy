import React, {Component} from 'react';
import './App.css';
import AddContentButton from "./components/add-content-button/add-content-button.component";
import MenuItemComponent from "./components/menu-item/menu-item.component";
import AddNoteComponent from "./components/add-note/add-note.component";
import NoteComponent from "./components/note/note.component";

class App extends Component {
  state = {
    menuToggled: false,
    addNoteToggled: false,
    menuItems: [
      {name: 'Note', icon: 'assets/icon-note.svg', handler: () => {this.addNoteToggle()}},
      {name: 'Images', icon: 'assets/icon-brand.svg'},
      {name: 'Document', icon: 'assets/icon-document.svg'},
      {name: 'Link', icon: 'assets/icon-link.svg'},
      {name: 'Video', icon: 'assets/video.svg'},
    ],
    notes: []
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.checkClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.checkClickOutside.bind(this));
  }

  renderMenuItems() {
    return this.state.menuItems.map(item => (
        <React.Fragment key={item.name}>
          <MenuItemComponent icon={item.icon} name={item.name} handler={item.handler} menuClicked={this.handleMenuClick}></MenuItemComponent>
        </React.Fragment>
    ));
  }

  menuToggled = () => {
    this.setState({menuToggled: !this.state.menuToggled})
  };

  handleMenuClick =(handler) => {
    if (handler) {
      handler();
    }
  };

  addNoteToggle = () => {
    this.setState({addNoteToggled: true, menuToggled: false});
  };

  isMenuToggled = () => {
    return this.state.menuToggled ? 'show' : 'hidden';
  };

  isAddNoteToggled = () => {
    return this.state.addNoteToggled ? 'show' : 'hidden';
  };

  setMenuRef = (node) => {
    this.menuRef = node;
  };

  setAddButtonRef = (node) => {
    this.addButtonRef = node;
  };

  checkClickOutside(e) {
    if (this.menuRef && this.addButtonRef && !this.menuRef.contains(e.target) && !this.addButtonRef.contains(e.target)) {
      this.setState({menuToggled: false});
    }
  }

  addNote = (note) => {
    const notes = this.state.notes;
    note.id = this.state.notes.length;
    notes.unshift(note);
    this.setState({notes, addNoteToggled: false});
  };

  renderNotes = () => {
    return this.state.notes.map(note => (
        <React.Fragment key={note.id}>
          <NoteComponent note={note}></NoteComponent>
        </React.Fragment>
    ));
  };

  render() {
    return (
        <div className='app'>
          <div className='side-menu'>
            <div ref={this.setAddButtonRef}>
              <AddContentButton toggleMenu={this.menuToggled} ref={this.setAddButtonRef}></AddContentButton>
            </div>
            <div className={'menu ' + this.isMenuToggled()} ref={this.setMenuRef}>
              {this.renderMenuItems()}
            </div>
          </div>
          <div className='notes-container'>
            <div className={'add-note-container ' + this.isAddNoteToggled()}>
              <AddNoteComponent onAddNote={this.addNote}></AddNoteComponent>
            </div>
            <div className='notes-list'>
              {this.renderNotes()}
            </div>
          </div>
        </div>
    );
  }
}

export default App;
