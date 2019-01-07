import React from 'react';

export const Start = (props) =>
    <React.Fragment>
        <h2>Who are you?</h2>
        <div>I am </div>
        <AskUserAttributes/>
        <div>.</div>
    </React.Fragment>;
    
class AskUserAttributes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'analytic'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('You are ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
            I am 
            <select value={this.state.value} onChange={this.handleChange}>
                <option value="analytic">analytic</option>
                <option value="creative">creative</option>
            </select>
        </label>
        <input type="submit" value="See me" />
      </form>
    );
  }
}