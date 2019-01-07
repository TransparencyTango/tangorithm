import React from 'react';

class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 'analytic'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(property) {
    return event => {
      event.preventDefault();
      property === "creative" ? this.props.onSubmit("pink") : this.props.onSubmit("green");
    }
  }

  render() {
    return (
      <React.Fragment>
          <h2>Who are you?</h2>
          <div>I am </div>
      <form onSubmit={this.handleSubmit(this.state.value)}>
        <label>
            I am
            <select value={this.state.value} onChange={this.handleChange}>
                <option value="analytic">analytic</option>
                <option value="creative">creative</option>
            </select>
        </label>
        <input type="submit" value="See me" />
      </form>
      <div>.</div>
      </React.Fragment>
    );
  }
}

export default Start;
