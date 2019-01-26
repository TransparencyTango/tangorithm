import React from 'react';
import './Form.css';


const LowerButtonBar = props => {
  return(
    <React.Fragment>
    <input type="button" value="Reset" onClick={props.resetMirror}/>
    <input type="button" value={"More " + (props.isActive ? "active)" : "inactive)")} disabled={!props.isActive} onClick={props.handleMore}/>
    </React.Fragment>
  );
}

const GenerateButton = props => {
  return(
    <React.Fragment>
      <input form="form0" type="submit" value={"Generate " + (props.isActive ? "active)" : "inactive)")} disabled={!props.isActive}/>
    </React.Fragment>
  );
}

const Form = props => {

    return (
      <div className="FormBox">
      <form id="form0" onSubmit={props.handleSubmit}>
      <input type="text" name="0" value={props.formState.formValues[0]} onChange={props.handleChange}/>
      <input type="text" name="1" value={props.formState.formValues[1]} onChange={props.handleChange}/><br/>
      <input type="text" name="2" value={props.formState.formValues[2]} onChange={props.handleChange}/>
      <input type="text" name="3" value={props.formState.formValues[3]} onChange={props.handleChange}/><br/>
      <input type="text" name="4" value={props.formState.formValues[4]} onChange={props.handleChange}/>
      <input type="text" name="5" value={props.formState.formValues[5]} onChange={props.handleChange}/><br/>
      </form>
      <GenerateButton isActive={props.formState.canSend}/>
      <LowerButtonBar isActive={props.formState.hasSent} resetMirror={props.handleReset} handleMore={props.handleMore}/>
      </div>
    );

}
export {Form};
