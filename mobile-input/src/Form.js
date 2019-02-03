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

class CharacteristicsInputField extends React.Component {
  constructor(props) {
      super(props);
      
      this.state = {
        suggestions: [],
        content: ""
      };    
      this.lastRequestedContent = "";
      this.updateSuggestions = this.updateSuggestions.bind(this);  
      this.onInputChoice = this.onInputChoice.bind(this);  
      this.handleChange = this.handleChange.bind(this);  
  }
  
  onInputChoice(event){
    this.setState({
      content: event
    });
    this.props.onInputChoice(this.props.name, event);
  }
  
  handleChange(event) {
    this.setState({
      content: event.target.value
    });
    this.props.onChange(event);
  }
  
  updateSuggestions(response){
    this.setState({
      suggestions: response
    });
  }
  
  suggestForNewInput(inputValue) {
    if (this.lastRequestedContent === inputValue) {
      return this.state.suggestions;
    }
    let saneInputValue = inputValue;
    saneInputValue = saneInputValue.replace('?', '');
    saneInputValue = saneInputValue.replace('/', '');
    saneInputValue = saneInputValue.replace('%', '');
    saneInputValue = saneInputValue.replace('#', '');
    saneInputValue = saneInputValue.replace('.', '');
    if (!saneInputValue) {
      return [];
    }
    fetch('/getAutocompletionList/'+ saneInputValue +'/5', {
      method: "GET",
      header: {
        accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(this.updateSuggestions)
      .catch(e => {console.log(e)});
    
    this.lastRequestedContent = inputValue;
    return this.state.suggestions;
  }
      
  render() {
    return (           
      <Downshift onChange={this.onInputChoice}>
          {  
            ({
              getInputProps,
              getItemProps,
              getMenuProps,
              highlightedIndex,
              inputValue,
              isOpen,
              selectedItem,
            }) => (
          <span className="input-and-suggestion">
                <input {...getInputProps({
                              type: "text",
                              name: this.props.name,
                              value: this.state.content,
                              onChange: this.handleChange})
                        } />
                <span className="suggestion-span">
                {isOpen
                  ? this.suggestForNewInput(inputValue)
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
                </span>
              </span> )
          }
        </Downshift>    
    );  
  }
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
    };

    this.state = this.initialState;
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChoice = this.onInputChoice.bind(this);
    this.clearForm    = this.clearForm.bind(this);
    this.resetMirror   = this.resetMirror.bind(this);
  }
  
  onInputChoice(name, value) {
    this.setState({
      [name]: value
    });
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
        <UpperButtonRow />
        <form onSubmit={this.handleSubmit}>
          <label> Characteristics </label> <label> Hobbies </label> <br />
          <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="characteristic1" />
          <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="hobby1" />
          <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="characteristic2" />
          <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="hobby2" />
          <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="characteristic3" />
          <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="hobby3" /><br/>
          <input type="submit" value="Generate" />
        </form>
        <LowerButtonRow clearForm={this.clearForm} resetMirror={this.resetMirror}/>
      </div>

    );
  }
}
export {Form};
