import React from 'react';
import './Form.css';
import './Screens.css';


const LowerButtonBar = props => {
  return(
    <React.Fragment>
    <input type="button" value="reset" id="reset_1" disabled={!props.canReset} onClick={props.resetMirror}/>
    <input type="button" value="more" id="more" disabled={!props.isActive} onClick={props.handleMore}/>
    </React.Fragment>
  );
}

const GenerateButton = props => {
  return(
    <React.Fragment>
      <input id="generate" value="" form="form0" type="submit" disabled={!props.isActive}/>
    </React.Fragment>
  );
}

class Form extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let inputFields = document.getElementsByTagName('input');
    for(let i=0; i<inputFields.length; i++){
      if (inputFields[i].getAttribute('type') === 'text' && !/^ex. /.test(inputFields[i].value)){
        inputFields[i].style.color = "black";
      }
    }
  }

  render() {
    return (
      <div className="Container">
        <div>
          <h1> Please tell me a few things about yourself </h1>
        </div>
          <div className="grid-container">

              <p> Which characteristics describe you the best? </p>

              <p> What kind of interests do you have? </p>

          </div>
        <form id="form0" onSubmit={this.props.handleSubmit}>
        <div className="grid-container">
          <div className="grid-element">
            <input type="text" name="0" value={this.props.values[0]} onChange={this.props.handleChange} onFocus={this.props.removeBackground}/>
            <input type="text" name="1" value={this.props.values[1]} onChange={this.props.handleChange} onFocus={this.props.removeBackground}/>
            <input type="text" name="2" value={this.props.values[2]} onChange={this.props.handleChange} onFocus={this.props.removeBackground}/>
          </div>
          <div className="grid-element">
            <input type="text" name="3" value={this.props.values[3]} onChange={this.props.handleChange} onFocus={this.props.removeBackground}/>
            <input type="text" name="4" value={this.props.values[4]} onChange={this.props.handleChange} onFocus={this.props.removeBackground}/>
            <input type="text" name="5" value={this.props.values[5]} onChange={this.props.handleChange} onFocus={this.props.removeBackground}/>
          </div>
        </div>
        </form>
        <GenerateButton isActive={this.props.buttonsState.canSend}/>
        <div className="LowerButtonBar">
          <LowerButtonBar isActive={this.props.buttonsState.hasSent} canReset={this.props.buttonsState.canReset} resetMirror={this.props.handleReset} handleMore={this.props.handleMore}/>
        </div>
      </div>
    );
  }

}
export {Form};
