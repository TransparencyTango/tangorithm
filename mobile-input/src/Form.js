import React from 'react';
import Downshift from 'downshift';

const UpperButtonRow = () => {
  const toggleMirrorView = event => {
    fetch('toggleMirrorView?view=' + event.target.value,{
        method: "POST",
      }).catch((error) => console.error(error));
  };

  return(
    <React.Fragment>
    <input type="button" value="neighbours" onClick={toggleMirrorView}/>
    <input type="button" value="similarities" onClick={toggleMirrorView}/>
    </React.Fragment>
  );
}

const LowerButtonRow = props => {
  return(
    <React.Fragment>
    <input type="button" value="clear" onClick={props.clearForm}/>
    <input type="button" value="reset" onClick={props.resetMirror}/>
    </React.Fragment>
  );
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      characteristic1: '',
      characteristic2: '',
      characteristic3: '',
      hobby1: '',
      hobby2: '',
      hobby3: '',
      suggestions: ["abc", "def"]
    };

    this.state = this.initialState;
    this.inputLetters = "";
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm    = this.clearForm.bind(this);
    this.resetMirror   = this.resetMirror.bind(this);
    this.updateSuggestions   = this.updateSuggestions.bind(this);
  }
  
  updateSuggestions(response){
    this.setState({
      suggestions: response
    })
  }
  
  saveNewInput(inputValue) {
    this.inputLetters = inputValue;
    fetch('/getAutocompletionList/'+ inputValue +'/5', {
      method: "GET",
      header: {
        accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(this.updateSuggestions)
      .catch(e => {console.log(e)});
    
    return this.state.suggestions;
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
  
  clearForm() {
    this.setState(this.initialState);
  }

  resetMirror() {
    fetch('resetMirror',{
        method: "POST",
      }).catch((error) => console.error(error));
  }

  render() {
    return (
      <div>
           
        <Downshift 
          id="downshift-simple" 
          onChange={this.onInputChoice}>
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
          }) => (
             <div>
              <input {...getInputProps({ placeholder: 'Search a country (start with a)'})} />
           <div {...getMenuProps()}>
          {isOpen
            ? this.saveNewInput(inputValue)
                .map((item, index) => (
                  <div
                    {...getItemProps({
                      key: item,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item}
                  </div>
                ))
            : null}
        </div>
          </div>
            
            
          )}
        </Downshift>    
      
      <UpperButtonRow />
      <form onSubmit={this.handleSubmit}>
      <label> Characteristics </label> <label> Hobbies </label> <br />
      <input type="text" name="characteristic1" value={this.state.characteristic1} onChange={this.handleChange}/>
      <input type="text" name="hobby1"          value={this.state.hobby1}          onChange={this.handleChange}/><br />
      <input type="text" name="characteristic2" value={this.state.characteristic2} onChange={this.handleChange}/>
      <input type="text" name="hobby2"          value={this.state.hobby2}          onChange={this.handleChange}/><br />
      <input type="text" name="characteristic3" value={this.state.characteristic3} onChange={this.handleChange}/>
      <input type="text" name="hobby3"          value={this.state.hobby3}          onChange={this.handleChange}/><br />
      <input type="submit" value="Generate" />
      </form>
      <LowerButtonRow clearForm={this.clearForm} resetMirror={this.resetMirror}/>
      </div>

    );
  }
}
export {Form};
