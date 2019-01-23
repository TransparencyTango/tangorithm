import React from 'react';
import './Form.css';


const LowerButtonRow = props => {
  return(
    <React.Fragment>
    <input type="button" value="Reset" onClick={props.resetMirror}/>
    <input type="button" value={"More (" + (props.isActive ? "active)" : "inactive)")} disabled={!props.isActive} onClick={props.handleMore}/>
    </React.Fragment>
  );
}

const GenerateButton = props => {
  return(
    <React.Fragment>
      <input form="form0" type="submit" value={"Generate (" + (props.isActive ? "active)" : "inactive)")} />
    </React.Fragment>
  );
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
        isActive: false,
        characteristic1: '',
        characteristic2: '',
        characteristic3: '',
        hobby1: '',
        hobby2: '',
        hobby3: '',
    };

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetMirror  = this.resetMirror.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    let x = Object.values(this.state).filter(value => value !== '')
    if ((x.length) > 4) {
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
    if (this.state.isActive) {
      fetch('postAttributes?words=' + Object.values(this.state).join(' ').substring(5),{
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

  render() {
    return (
      <div className="FormBox">
      <form id="form0" onSubmit={this.handleSubmit}>
      <input type="text" name="characteristic1" value={this.state.characteristic1} onChange={this.handleChange}/>
      <input type="text" name="hobby1"          value={this.state.hobby1}          onChange={this.handleChange}/><br />
      <input type="text" name="characteristic2" value={this.state.characteristic2} onChange={this.handleChange}/>
      <input type="text" name="hobby2"          value={this.state.hobby2}          onChange={this.handleChange}/><br />
      <input type="text" name="characteristic3" value={this.state.characteristic3} onChange={this.handleChange}/>
      <input type="text" name="hobby3"          value={this.state.hobby3}          onChange={this.handleChange}/><br />
      </form>
      <GenerateButton isActive={this.state.isActive}/>
      <LowerButtonRow isActive={this.state.isActive} resetMirror={this.resetMirror} handleMore={this.props.handleMore}/>
      </div>
    );
  }
}
export {Form};
