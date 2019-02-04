import React from 'react';

const LowerButtonRow = props => {
  // TODO: More redirects to the next screen
  return(
    <React.Fragment>
    <input type="button" value="Reset" onClick={props.resetMirror}/>
    <input type="button" value="More" onClick={props.handleMore}/>
    </React.Fragment>
  );
}

class TestForm extends React.Component {
  // TODO: needs an 'active' attribute
  constructor(props) {
    super(props);

    this.initialState = {
        values: {
          characteristic1: '',
          characteristic2: '',
          characteristic3: '',
          hobby1: '',
          hobby2: '',
          hobby3: '',
        },
        isActive: false,
    };

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetMirror  = this.resetMirror.bind(this);
  }

  handleChange(event) {
    this.setState({
      values:{
      [event.target.name]: event.target.value
    }
    });
    // TODO: onChange seems to be one letter behind (the letter from the event)
    // TODO: without "isActive" or at least substract it
    let x = Object.values(this.state.values).filter(value => value !== '')
    if ((x.length) >= 4) {
      console.log(x + " active");
      this.setState({isActive:true});
    }
    else {
      console.log(x + " inactive");
      this.setState({isActive:false});
    }
  }

  handleSubmit(event){
    event.preventDefault();
    // TODO: don't send true
    if (this.state.isActive) {
      fetch('postAttributes?words=' + Object.values(this.state.values).join(' '),{
          method: "POST",
        }).catch((error) => console.error(error));
    }
  }

  resetMirror() {
    this.setState(this.initialState);
    fetch('resetMirror',{
        method: "POST",
      }).catch((error) => console.error(error));
  }

  componentDidMount() {
    this.setState(this.initialState);
  }

  render() {
    console.log(this.state.values);
    return (
      <div>
      <h2> Please tell me a few things about yourself!</h2>
      <form onSubmit={this.handleSubmit}>
      <label> Characteristics </label> <label> Hobbies </label> <br />
      <input type="text" name="characteristic1" value={this.state.values.characteristic1} onChange={this.handleChange}/>
      <input type="text" name="hobby1"          value={this.state.values.hobby1}          onChange={this.handleChange}/><br />
      <input type="text" name="characteristic2" value={this.state.values.characteristic2} onChange={this.handleChange}/>
      <input type="text" name="hobby2"          value={this.state.values.hobby2}          onChange={this.handleChange}/><br />
      <input type="text" name="characteristic3" value={this.state.values.characteristic3} onChange={this.handleChange}/>
      <input type="text" name="hobby3"          value={this.state.values.hobby3}          onChange={this.handleChange}/><br />
      <input type="submit" value={"Generate " + this.state.isActive} />
      </form>
      <LowerButtonRow resetMirror={this.resetMirror} handleMore={this.props.handleMore}/>
      </div>
    );
  }
}
export {TestForm};
