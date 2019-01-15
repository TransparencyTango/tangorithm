import React, { Component } from 'react';

var pics = {
  "default":  require('./img/unknown_person.jpg'),
  "pink":     require('./img/pink_hair.jpg'),
  "green":    require('./img/green_hair.jpg')
};

class Mirror extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "isReflection": false,
      "name" : null,
      "reflectionPic": "default"
    };
    this.timer = null;
    this.fetchStatus = this.fetchStatus.bind(this);
    this.updateReflection = this.updateReflection.bind(this);
  }
  
  updateReflection = (result) => {
    const reflectionName = result[1];
    let reflectionPic = "default";   
    if (pics.hasOwnProperty(reflectionName)) {
      reflectionPic = reflectionName
    }

    return this.setState({isReflection: result[0] === "True", 
                          name: reflectionName, 
                          reflectionPic: reflectionPic
                        });
  }

  fetchStatus = () => {
    fetch('/getModelName', {
      method: "GET",
      header: {
        accept: "application/text"
      }
    })
      .then(response => response.text())
      .then(text => text.split(' '))
      .then(this.updateReflection)
      .catch(e => console.log(e));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.name !== nextState.name;
  }

  componentDidMount() {
    this.timer = setInterval(() => this.fetchStatus(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    return (
      <div>
        <h2>That is you</h2>
        <p>
          <img height="250" src={pics[this.state.reflectionPic]} alt="" />        
          {this.state.name}
        </p>
      </div>
    );
  }
}

export default Mirror;
