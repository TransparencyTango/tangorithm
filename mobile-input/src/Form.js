import React from 'react';
import {FormDropDown} from './FormDropDown';

const dropDownItems = {
  "interests": ["technology", "design", "photography"],
  "mentalStats": ["analytic", "creative"],
  "personalities": ["shy", "calm", "crazy", "wild"]
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interest: dropDownItems.interests[0],
      mentalStat: dropDownItems.mentalStats[0],
      personality: dropDownItems.personalities[0],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('postAttributes?words=' + Object.values(this.state).join(' '),{
        method: "POST",
      }).catch((error) => console.error(error));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormDropDown name="interest" options={dropDownItems.interests} value={this.state.interest} handleChange={this.handleChange}/><br />
        <FormDropDown name="mentalStat" options={dropDownItems.mentalStats} value={this.state.mentalStat} handleChange={this.handleChange}/><br />
        <FormDropDown name="personality" options={dropDownItems.personalities} value={this.state.personality} handleChange={this.handleChange}/><br />
        <input type="submit" value="See me" />
      </form>
    );
  }
}
export {Form};
