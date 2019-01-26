import React from 'react';
import './Explanation.css';

class UpperButtonBar extends React.Component {

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
    console.log(name);
    fetch('toggleMirrorView?view=' + value,{
        method: "POST",
      }).catch((error) => console.error(error));
    name === "similarities" ? this.setState({similaritiesPressed: !this.state.similaritiesPressed}) : this.setState({neighboursPressed: !this.state.neighboursPressed});
  }

    render() {
      return(
        <React.Fragment>
        <input type="button" name="similarities" value={"similarities " + this.state.similaritiesPressed} onClick={this.toggleMirrorView}/>
        <input type="button" name="neighbours" value={"neighbours " + this.state.neighboursPressed} onClick={this.toggleMirrorView}/>
        </React.Fragment>
      );
    }
}

const LowerButtonBar = props => {
  return(
    <React.Fragment>
    <input id="back" type="button" value="Back" onClick={props.handleBack}/>
    <input id="reset" type="button" value="Reset" onClick={props.resetMirror}/>
    </React.Fragment>
  );
}

const Explanation = props => {
    return (
      <div>
      <div className="InfoButtons">
      <UpperButtonBar />
      </div>
      <div className="LowerButtonBar">
      <LowerButtonBar handleBack={props.handleBack} resetMirror={props.handleReset}/>
      </div>
      </div>
    );
}

export {Explanation};
