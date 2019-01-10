import React from 'react';

class FormDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      options: this.props.options,
      value: this.props.value
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    this.props.handleChange(event);
  }

  render() {
    return (
      <React.Fragment>
      <label>{this.state.name}:</label>
      <select name={this.state.name} value={this.state.value} onChange={this.handleChange}>
      {this.state.options.map((item) => <option key={item}> {item} </option>)}
      </select>
      </React.Fragment>
    );
  }
}
export {FormDropDown};
