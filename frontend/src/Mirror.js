import React, { Component } from 'react';

var pics = {
  "default":  require('./img/unknown_person.jpg'),
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
      "showSimilarities": false,
      "knns": null,
      "similarities": null
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
                          reflectionPic: reflectionPic,
                          showSimilarities: result[2] === "True",
                          showKNN: result[3] === "True",
                          knns: result[4],
                          similarities: result[5]
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
    return this.state.name !== nextState.name || this.showKNN !== nextState.showKNN;
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
        {this.state.showKNN &&
          <p> 5 nearest Neighbours: {this.state.knns} </p>
        }
        {this.state.showSimilarities &&
          <p> Similarity to "successful": {this.state.similarities} </p>
        }
      </div>
    );
  }
}

export default Mirror;
