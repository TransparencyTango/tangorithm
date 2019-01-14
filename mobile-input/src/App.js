import React, { Component } from 'react';
import './App.css';
import {Form} from './Form';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h2>Who are you?</h2>
        <Form/>
      </div>
    );
  }
}

export default App;
