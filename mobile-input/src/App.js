import React, { Component } from 'react';
import './App.css';
import {Form} from './Form';
import {Explanation} from './Explanation';


const LoadingScreen = props => {
  if (props.showImage) {
    return (
        <img className="fullscreen" src="/img/screen3.jpg" alt="Now you can see yourself in the mirror"/>
    )
  } else {
    return(
        <video className="fullscreen" id="animation" controls autoPlay loop>
          <source src="/img/mirror_mirror.mp4" type="video/mp4"/>
          <source src="/img/mirror_mirror.webm" type="video/webm"/>
        </video>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      showStart: true,
      buttonsState: {
        canReset: false,
        canSend: false,
        hasSent: false,
      },
      loadingState: "none",
      formValues: ['ex. intelligent', 'ex. arrogant', 'ex. open-minded', 'ex. golf', 'ex. cooking', 'ex. cinema'],
      additionalInformation: {
        showNeighbours: false,
        showSimilarities: false
      }
    }

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.toggleScreen = this.toggleScreen.bind(this);
    this.resetMirror = this.resetMirror.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.toggleInformation = this.toggleInformation.bind(this);
    this.setFontColor = this.setFontColor.bind(this);
  }

  toggleScreen() {
    this.setState({showStart: !this.state.showStart});
  }

  toggleInformation(buttonsStatus) {
    this.setState({additionalInformation: buttonsStatus})
  }

  resetMirror() {
    this.setState(this.initialState);
    fetch('resetMirror',{
        method: "POST",
      }).catch((error) => console.error(error));
    this.setFontColor();
  }

  handleChange(name, value) {
    const updatedValues = Object.assign({}, this.state.formValues, {[name]: value});
    const numInputValues = Object.values(this.state.formValues).filter(value => !/^ex. /.test(value) && value !== '').length;
    const newButtonsState = Object.assign({}, this.state.buttonsState, {canReset: (numInputValues > 0), canSend: (numInputValues >= 4)});
    this.setState({formValues: updatedValues, buttonsState: newButtonsState });
  }

  handleSubmit(event){
    event.preventDefault();
    const input =  Object.values(this.state.formValues).filter(value => !/^ex. /.test(value)).map(value => value.trim().split(/\s+/)[0]).join(' ');
    fetch('postAttributes?words=' + input,{
        method: "POST",
      })
      .then(function(res) {
        if(!res.ok){
          alert(res.statusText);
        }
      })
      .then(() => this.setState({loadingState: "showHint"}))
      .then(() => setTimeout((() => this.setState({loadingState: "none"})), 3000))
      .catch((error) =>  {
        this.setState({loading:false, finishLoading:false, hasSent:false});
        alert(error);
      });
      const showMore = Object.assign({}, this.state.buttonsState, {hasSent: true});
      this.setState({buttonsState: showMore, loadingState: "loading"});
  }

  handleFocus(event) {
    const name = event.target.name;
    if(/^ex. /.test(this.state.formValues[name])) {
      let updatedValues = Object.assign({}, this.state.formValues, {[name]: ''});
      this.setState({formValues: updatedValues});
      document.getElementsByName(name)[0].style.color="black";
    }
  }

  setFontColor() {
    let inputFields = document.getElementsByTagName('input');
    for(let i=0; i<inputFields.length; i++){
      if (inputFields[i].getAttribute('type') === 'text' && !/^ex. /.test(inputFields[i].value)){
        inputFields[i].style.color = "#646361";
      }
    }
  }

  render() {
    if (this.state.loadingState === "loading" || this.state.loadingState === "showHint") {
      return(
        <LoadingScreen showImage={this.state.loadingState === "showHint"} />
      );
    }
    else if (this.state.showStart) {
      return (
        <div className="Form">
          <Form values={this.state.formValues} buttonsState={this.state.buttonsState} updateAppState={this.updateState} handleChange={this.handleChange} handleMore={this.toggleScreen} handleReset={this.resetMirror} handleSubmit={this.handleSubmit} removeBackground={this.handleFocus}/>
        </div>
      );
    }
    else {
      return (
        <div className="Explanation">
          <Explanation handleBack={this.toggleScreen} handleReset={this.resetMirror} buttonsState={this.state.additionalInformation} toggleInformation={this.toggleInformation}/>
        </div>
      );
    }

  }
}

export default App;
