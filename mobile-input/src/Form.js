import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characteristic1: '',
      characteristic2: '',
      characteristic3: '',
      hobby1: '',
      hobby2: '',
      hobby3: '',
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
      <input type="button" value="neighbours" />
      <input type="button" value="similarities" /><br />
      <label> Characteristics </label> <label> Hobbies </label> <br />
      <input type="text" name="characteristic1" value={this.state.characteristic1} onChange={this.handleChange}/>
      <input type="text" name="hobby1"          onChange={this.handleChange}/><br />
      <input type="text" name="characteristic2" onChange={this.handleChange}/>
      <input type="text" name="hobby2"          onChange={this.handleChange}/><br />
      <input type="text" name="characteristic3" onChange={this.handleChange}/>
      <input type="text" name="hobby3"          onChange={this.handleChange}/><br />
      <input type="submit" value="Generate" />
      </form>
    );
  }
}
export {Form};
