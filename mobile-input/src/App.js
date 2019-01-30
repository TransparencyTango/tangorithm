import React, { Component } from 'react';
import './App.css';
import {Form} from './Form';
import {Explanation} from './Explanation';

class App extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      showStart: true,
      canSend: false,
      hasSent: false,
      formValues: ['', '', '', '', '', '']
    }

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.toggleScreen = this.toggleScreen.bind(this);
    this.resetMirror = this.resetMirror.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  toggleScreen() {
    this.setState({showStart: !this.state.showStart});
  }

  resetMirror() {
    console.log(this.initialState);
    this.setState(this.initialState);
    fetch('resetMirror',{
        method: "POST",
      }).catch((error) => console.error(error));
  }

  handleChange(event) {
    const {name, value} = event.target;
    let updatedValues = Object.assign({}, this.state.formValues, {[name]: value});
    this.setState({formValues: updatedValues});

    let active = Object.values(this.state.formValues).filter(value => value !== '').length >= 4;
    this.setState({canSend: active});
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('postAttributes?words=' + Object.values(this.state.formValues).join(' '),{
        method: "POST",
      }).catch((error) => console.error(error));
      // TODO: loading animation
    this.setState({hasSent: true});
  }

  handleFocus(event) {
    document.getElementById("c1").style.background = "none";
  }

  render() {
    if (this.state.showStart) {
      return (
        <div className="Form">
          <Form formState={this.state} handleChange={this.handleChange} handleMore={this.toggleScreen} handleReset={this.resetMirror} handleSubmit={this.handleSubmit} removeBackground={this.handleFocus}/>
        </div>
      );
    }
    else {
      return (
        <div className="Explanation">
          <Explanation handleBack={this.toggleScreen} handleReset={this.resetMirror}/>
        </div>
      );
    }

  }
}

export default App;
