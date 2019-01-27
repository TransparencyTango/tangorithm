import React from 'react';
import './Form.css';
import './App.css';


const LowerButtonBar = props => {
  return(
    <React.Fragment>
    <input type="button" id="reset_arrow" onClick={props.resetMirror}/>
    <input type="button" id="more" disabled={!props.isActive} onClick={props.handleMore}/>
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
          <img id="title" src="css_img/screen1/title.png" alt="title"/>
        </div>
        <div>
          <img  className="left" src="css_img/screen1/characteristics.png" alt="characteristics"/>
          <img  className="right" src="css_img/screen1/hobbys.png" alt="hobbys"/>
        </div>
        <form id="form0" onSubmit={props.handleSubmit}>
          <input className="left" id="c1" type="text" name="0" value={props.formState.formValues[0]} onChange={props.handleChange} onFocus={props.removeBackground}/>
          <input className="right" id="h1" type="text" name="1" value={props.formState.formValues[1]} onChange={props.handleChange}/>
          <input className="left" id="c2" type="text" name="2" value={props.formState.formValues[2]} onChange={props.handleChange}/>
          <input className="right" id="h2" type="text" name="3" value={props.formState.formValues[3]} onChange={props.handleChange}/>
          <input className="left" id="c3" type="text" name="4" value={props.formState.formValues[4]} onChange={props.handleChange}/>
          <input className="right" id="h3" type="text" name="5" value={props.formState.formValues[5]} onChange={props.handleChange}/>
        </form>
        <GenerateButton isActive={props.formState.canSend}/>
        <div className="LowerButtonBar">
          <LowerButtonBar isActive={props.formState.hasSent} resetMirror={props.handleReset} handleMore={props.handleMore}/>
        </div>
      </div>
    );

}
export {Form};
