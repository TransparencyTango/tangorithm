import React from 'react';

 const FormDropDown = (props) => (
  <React.Fragment>
    <label>{props.name}:</label>
    <select name={props.name} value={props.value} onChange={(event) => props.handleChange(event)}>
      {props.options.map((item) => <option key={item}> {item} </option>)}
    </select>
  </React.Fragment>
  );
export {FormDropDown};
