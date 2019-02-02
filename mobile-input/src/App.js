import React, { Component } from 'react';
import './App.css';
import {Form} from './Form';
import {Explanation} from './Explanation';


const LoadingScreen = props => {
  if (props.showImage) {
    return (
        <img className="fullscreen" src="css_img/screen3.jpg" alt="Now you can see yourself in the mirror"/>
    )
  } else {
    return(
        <video className="fullscreen" id="animation" controls autoPlay loop>
          <source src="css_img/mirror_mirror.mp4" type="video/mp4"/>
        </video>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      showStart: true,
      canSend: false,
      hasSent: false,
      loading: false,
      finishLoading: false,
      formValues: ['ex. intelligent', 'ex. arrogant', 'ex. open-minded', 'ex. golf', 'ex. cooking', 'ex. cinema']
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

    let active = Object.values(this.state.formValues).filter(value => value !== '').length >= 1;
    this.setState({canSend: active});
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('postAttributes?words=' + Object.values(this.state.formValues).join(' '),{
        method: "POST",
      })
      .then(() => this.setState({loading: false, finishLoading: true}))
      .then(() => setTimeout((() => this.setState({finishLoading: false})), 1000))
      .catch((error) => console.error(error));
    this.setState({hasSent: true, loading: true});

  }

  handleFocus(event) {
    const {name} = event.target;
    let updatedValues = Object.assign({}, this.state.formValues, {[name]: ''});
    this.setState({formValues: updatedValues});
  }

  render() {
    if (this.state.loading || this.state.finishLoading) {
      return(
        <LoadingScreen showImage={this.state.finishLoading} />
      );
    }
    else if (this.state.showStart) {
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
