import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interest: '',
      mentalStat: '',
      personality: ''
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
    fetch('getDistances?words=' + this.state.interest + ',' + this.state.mentalStat + ',' + this.state.personality, {
        method: "POST",
      }).catch((error) => console.error(error));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select name="interest" value={this.state.interest} onChange={this.handleChange}>
            <option value="technology">technology</option>
            <option value="design">design</option>
            <option value="photography">photography</option>
          </select>
        </label>
        <br />
        <label>
          <select name="mentalStat" value={this.state.mentalStat} onChange={this.handleChange}>
              <option value="analytic">analytic</option>
              <option value="creative">creative</option>
          </select>
        </label>
        <br />
        <label>
          <select name="personality" value={this.state.value} onChange={this.handleChange}>
            <option value="shy">shy</option>
            <option value="calm">calm</option>
            <option value="crazy">crazy</option>
            <option value="wild">wild</option>
          </select>
        </label>
        <br />
        <input type="submit" value="See me" />
      </form>
    );
  }
}
export {Form};
