import React, { Component } from 'react';

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
      "showSimilarities": false,
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

  render() {
    return (
      <div id="mirror-complete">
        <img id="reflection-img" src={pics[this.state.reflectionPic]} alt={this.state.name} />
          {/*this.state.name*/}
        <div id="knn">
          {this.state.showKNN &&
            <p> 5 nearest Neighbours: {this.state.knns.join(', ')} </p>
          }
        </div>
        <div id="similarities">
          {this.state.showSimilarities &&
          <p> Similarity to "successful", [...]: {this.state.similarities.join(', ')} </p>
        }
        </div>
      </div>
    );
  }
}

export default Mirror;
