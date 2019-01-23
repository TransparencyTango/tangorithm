import React, { Component } from 'react';
import './App.css';
import {Form} from './Form';
import {Explanation} from './Explanation';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showStart: true
    };

    this.toggleScreen = this.toggleScreen.bind(this);
  }

  toggleScreen() {
    this.setState({showStart: !this.state.showStart});
  }

  render() {
    if (this.state.showStart) {
      return (
        <div className="Form">
          <Form handleMore={this.toggleScreen}/>
        </div>
      );
    }
    else {
      return (
        <div className="Explanation">
          <Explanation handleBack={this.toggleScreen}/>
        </div>
      );
    }

  }
}

export default App;
