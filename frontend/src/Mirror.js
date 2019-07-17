import React, { Component } from 'react';
import Webcam from 'react-webcam';

var pics = {
  "default":  require('./img/default.jpg'),
  "pink":     require('./img/pink_hair.jpg'),
  "green":    require('./img/green_hair.jpg'),
  "punk1":    require('./img/green_hair.jpg')
};

class Mirror extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "isReflection": false,
      "name" : null,
      "reflectionPic": "default",
      "showKNN": false,
      "showSimilarities": true,
      "knns": [],
      "similarities": []
    };
    this.timer = null;
    this.fetchStatus = this.fetchStatus.bind(this);
    this.updateReflection = this.updateReflection.bind(this);
  }

  updateReflection = (result) => {
    const reflectionName = result.name;
    let reflectionPic = "default";
    if (pics.hasOwnProperty(reflectionName)) {
      reflectionPic = reflectionName
    }

    return this.setState({isReflection: result.isReflection === "True",
                          name: reflectionName,
                          reflectionPic: reflectionPic,
                          showSimilarities: result.showSimilarities === "True",
                          showKNN: result.showKNN === "True",
                          knns: result.knns,
                          similarities: result.similarities
                        });
  }

  fetchStatus = () => {
    fetch('/getMirrorState', {
      method: "GET",
      header: {
        accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(this.updateReflection)
      .catch(e => console.log(e));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.name !== nextState.name || this.state.showKNN !== nextState.showKNN ||
    this.state.showSimilarities !== nextState.showSimilarities || this.state.knns !== nextState.knns ||
    this.state.similarities !== nextState.similarities;
  }

  componentDidMount() {
    this.timer = setInterval(() => this.fetchStatus(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  
  parseSimilarities() {
    let similarities = [];
    this.state.similarities.forEach((element) => {
      similarities.push(((element+1)/2).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}));
    }); 
    /*return <p> You are "successful":  <br/>
          {similarities[0]}%<br/>
          You are "engaged":  <br/>
          {similarities[1]}% <br/>
          You are "happy":  <br/>
          {similarities[2]}%          
          </p> */  
    return <React.Fragment> 
            <div id="leftTopSimil" >
              You will be successful: {similarities[0]} <br/>
              You'll grow old: {similarities[1]} <br/>
            </div>
            <div id="leftSimil">
              You will be loved: {similarities[2]} <br/>   
            </div>
            <div id="leftBottomSimil">
              You become antisocial: <br/>
              {similarities[3]} <br/>        
              You become male:<br/>
              {similarities[4]} <br/>          
              You're gonna do something good: <br/>
              {similarities[5]} <br/>   
            </div> 
            <div id="rightSimil">
              You're gonna be a criminal: {similarities[6]} <br/> 
              You get sick: {similarities[7]}
            </div>
          </React.Fragment>
  }

  render() {
    return (
      <div id="mirror-complete">
          {this.state.showSimilarities &&
            this.parseSimilarities()}
        <div id="webcam">
          <Webcam />
        </div>
      </div>
    );
  }
}

export default Mirror;
