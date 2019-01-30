import React from 'react';
import './Explanation.css';
import './Screens.css';

class InfoButtonBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      similaritiesPressed: false,
      neighboursPressed: false
    }

    this.toggleMirrorView = this.toggleMirrorView.bind(this);
  }

  toggleMirrorView(event) {
    const {name, value} = event.target;
    fetch('toggleMirrorView?view=' + value,{
        method: "POST",
      }).catch((error) => console.error(error));
    //name === "similarities" ? this.setState({similaritiesPressed: !this.state.similaritiesPressed}) : this.setState({neighboursPressed: !this.state.neighboursPressed});
    let active = "active";
    if (name === "similarities") {
      this.setState({similaritiesPressed: !this.state.similaritiesPressed});
      active = this.state.similaritiesPressed ? "active" : "inactive";
    }
    else {
      this.setState({neighboursPressed: !this.state.neighboursPressed});
      active = this.state.neighboursPressed ? "active" : "inactive";
    }
    document.getElementById(name).style.background = "url('/css_img/screen2/" + name + "_" + active + ".png')";
    document.getElementById(name).style.backgroundSize = "100% 100%";
    document.getElementById(name).style.backgroundPosition = "center center"
  }

    render() {
      return(
        <React.Fragment>
        <input type="button" id="similarities" name="similarities" onClick={this.toggleMirrorView}/>
        <input type="button" id="neighbours" name="neighbours"  onClick={this.toggleMirrorView}/>
        </React.Fragment>
      );
    }
}

const LowerButtonBar = props => {
  return(
    <React.Fragment>
    <input id="back" value="back" type="button" onClick={props.handleBack}/>
    <input id="reset" value="reset" type="button" onClick={props.resetMirror}/>
    </React.Fragment>
  );
}

const Explanation = props => {
    return (
      <div className="Container2">
        <div>
          <img id="arrow" src="css_img/screen2/arrow.png" alt="Arrow"/>
        </div>
        <div>
          <h2> Now you can see what the algorithm thinks is the most fitting visual
          representation of you, based on your input.</h2>
          <p> Our algorithm consists of a "wordcloud" and if words have similar
          meaning, they are closer to eachother. To create this "wordcloud" the
          algorithm was trained on thousands of news articles. </p>
          <p> By pressing "neighbours" you can see which words are closest to your
          input in this "wordcloud". By pressing "similarities" you can see how
          similar the algorithm thinks your input is to the displayed words.
          </p>
        </div>
        <div className="InfoButtonBar">
          <InfoButtonBar />
        </div>
        <div className="LowerButtonBar">
          <LowerButtonBar handleBack={props.handleBack} resetMirror={props.handleReset}/>
        </div>
      </div>
    );
}

export {Explanation};
