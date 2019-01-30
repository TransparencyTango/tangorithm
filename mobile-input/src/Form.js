import React from 'react';
import './Form.css';
import './Screens.css';


const LowerButtonBar = props => {
  return(
    <React.Fragment>
    <input type="button" value="reset" id="reset_1" disabled={!props.isActive} onClick={props.resetMirror}/>
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

const Form = props => {

    return (
      <div className="Container">
        <div>
          <h1> Please tell me a few things about yourself </h1>
        </div>
        <div className="column">
          <p> Which characteristics describe you the best? </p>
        </div>
        <div className="column">
          <p> What kind of interests do you have? </p>
        </div>
        <form id="form0" onSubmit={props.handleSubmit}>
        <div className="column">
          <input id="c1" type="text" name="0" value={props.formState.formValues[0]} onChange={props.handleChange} onFocus={props.removeBackground}/>
          <input id="h1" type="text" name="1" value={props.formState.formValues[1]} onChange={props.handleChange}/>
          <input  id="c2" type="text" name="2" value={props.formState.formValues[2]} onChange={props.handleChange}/>
        </div>
        <div className="column">
          <input  id="h2" type="text" name="3" value={props.formState.formValues[3]} onChange={props.handleChange}/>
          <input  id="c3" type="text" name="4" value={props.formState.formValues[4]} onChange={props.handleChange}/>
          <input  id="h3" type="text" name="5" value={props.formState.formValues[5]} onChange={props.handleChange}/>
        </div>
        </form>
        <GenerateButton isActive={props.formState.canSend}/>
        <div className="LowerButtonBar">
          <LowerButtonBar isActive={props.formState.hasSent} resetMirror={props.handleReset} handleMore={props.handleMore}/>
        </div>
      </div>
    );

}
export {Form};
