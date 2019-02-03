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
      canReset: false,
      canSend: false,
      hasSent: false,
      loading: false,
      finishLoading: false,
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
      let inputFields = document.getElementsByTagName('input');
      for(let i=0; i<inputFields.length; i++){
        if (inputFields[i].getAttribute('type') === 'text' && !/^ex. /.test(inputFields[i].value)){
          inputFields[i].style.color = "#646361";
        }
      }
  }

  handleChange(event) {
    const {name, value} = event.target;
    let updatedValues = Object.assign({}, this.state.formValues, {[name]: value});
    let numInputValues = Object.values(this.state.formValues).filter(value => !/^ex. /.test(value) && value !== '').length;
    this.setState({formValues: updatedValues, canReset: (numInputValues > 0), canSend: (numInputValues >= 4)});
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
      .then(() => this.setState({loading: false, finishLoading: true}))
      .then(() => setTimeout((() => this.setState({finishLoading: false})), 1500))
      .catch((error) =>  {
        this.setState({loading:false, finishLoading:false, hasSent:false});
        alert(error);
      });
    this.setState({hasSent: true, loading: true});
  }

  handleFocus(event) {
    const {name} = event.target;
    let updatedValues = Object.assign({}, this.state.formValues, {[name]: ''});
    this.setState({formValues: updatedValues});
    document.getElementsByName(name)[0].style.color="black";
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
          <Explanation handleBack={this.toggleScreen} handleReset={this.resetMirror} buttonsState={this.state.additionalInformation} toggleInformation={this.toggleInformation}/>
        </div>
      );
    }

  }
}

export default App;
