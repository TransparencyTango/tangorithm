import React from 'react';
import './Explanation.css';

const UpperButtonRow = () => {

  // TODO: active inactive state ?
  const toggleMirrorView = event => {
    fetch('toggleMirrorView?view=' + event.target.value,{
        method: "POST",
      }).catch((error) => console.error(error));
  };

  return(
    <React.Fragment>
    <input type="button" value="similarities" onClick={toggleMirrorView}/>
    <input type="button" value="neighbours" onClick={toggleMirrorView}/>
    </React.Fragment>
  );
}

const LowerButtonBar = props => {
  return(
    <React.Fragment>
    <input id="back" type="button" disabled="true3" value="Back" onClick={props.handleBack}/>
    <input id="reset" type="button" value="Reset" onClick={props.resetMirror}/>
    </React.Fragment>
  );
}

class Explanation extends React.Component {
  constructor(props) {
    super(props);

    this.resetMirror   = this.resetMirror.bind(this);
  }

  resetMirror() {
    console.log("reset");
    fetch('resetMirror',{
        method: "POST",
      }).catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
      <div className="InfoButtons">
      <UpperButtonRow />
      </div>
      <div className="LowerButtonBar">
      <LowerButtonBar handleBack={this.props.handleBack} resetMirror={this.resetMirror}/>
      </div>
      </div>
    );
  }
}
export {Explanation};
