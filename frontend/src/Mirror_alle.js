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
    return <React.Fragment>
            <div id="leftTopSimil" >
              You will be left: <span class="percent">{similarities[0]} </span> <br/>
              You'll be suicidal: <span class="percent">{similarities[1]} </span> <br/>
            </div>
            <div id="leftSimil">
              You will be conservative: {similarities[2]} <br/>
            </div>
            <div id="leftBottomSimil">
              You will be liberal: <span class="percent">{similarities[3]} </span> <br/>
              You'll be executive: <span class="percent">{similarities[4]} </span> <br/>
              You will be a prof.: <span class="percent">{similarities[5]} </span> <br/>
            </div>
            <div class="rightSimil">
              You're gonna be a doc.: {similarities[6]} <br/>
              You're gonna be an assistant: <span class="percent"> {similarities[7]} </span>
            </div>

       <div class="blackFont" >
              You will be a sozialist: {similarities[0]} <br/>
              You'll be liberal: {similarities[1]} <br/>
            </div>
            <div class="blackFont">
              You will be conservative: {similarities[2]} <br/>
            </div>
                <div class="blackFont">
                You'll be successfull: {similarities[3]} <br/>
            </div>
                <div class="blackFont">
                  You'll be lose: {similarities[4]} <br/>
            </div>
              <div class="blackFont">
              You'll be loved: {similarities[5]} <br/>
              </div>
              <div class="blackFont">
              You will be hated: {similarities[6]}
              <br/>
              </div>
                <div class="blackFont">
              You will have children: {similarities[7]}
              <br/>
              </div>
              <div class="blackFont">
              You will be a criminal: {similarities[8]}
              <br/>
              </div>
              <div class="blackFont">
              You will be suicidal: {similarities[9]}
              <br/>
              </div>
              <div class="blackFont">
              You will be a maid: {similarities[10]}
              <br/>
              </div>
              <div class="blackFont">
              You will be a waitress: {similarities[11]}
              <br/>
              </div>
              <div class="blackFont">
              You will be a receptionist: {similarities[12]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a nurse: {similarities[13]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a midwife: {similarities[14]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a nanny: {similarities[15]} <br/>
              <br/>
              You will be a housekeeper: {similarities[16]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a hostess: {similarities[17]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a gynecolist: {similarities[18]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a socialite: {similarities[19]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a undertaker: {similarities[20]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a referee: {similarities[21]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a actor: {similarities[22]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a coach: {similarities[23]} <br/>  </div>
                <div class="blackFont">
              <br/>
              You will be a president: {similarities[24]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              You will be a plumber: {similarities[25]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              You will be a announcer: {similarities[26]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              You will be a maestro: {similarities[27]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              You will be a janitor: {similarities[28]} <br/>
              </div>
              <div class="blackFont">
              <br/>
              You will be a professor: {similarities[29]} <br/>
              </div>
              <div class="blackFont">
              You will be a doctor: {similarities[30]}
            </div>
            <div class="blackFont">
              You're gonna be a assistant: {similarities[31]}
            </div>


          </React.Fragment>
  }

  render() {
    return (
      <div id="mirror-complete">
          {this.state.showSimilarities &&
            this.parseSimilarities()}
            <video className="fullscreen"id="animation"autoPlay loop>
            <source src="/img/sick.webm" type="video/webm"/>
          </video>
        </div>
      );
    }
}

export default Mirror;
