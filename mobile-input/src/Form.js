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
      this.updateSuggestions = this.updateSuggestions.bind(this);  
      this.onInputChoice = this.onInputChoice.bind(this);  
      this.handleChange = this.handleChange.bind(this);  
  }
  
  onInputChoice(event){
    this.setState({
      content: event
    });
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
          <span className="tehest">
                <input {...getInputProps({
                              type: "text",
                              name: this.props.name,
                              value: this.state.content,
                              onChange: this.handleChange,
                              className: "test-input"})
                        } />
                <span className="suggestion-span">
                {isOpen
                  ? this.suggestForNewInput(inputValue)
                      .map((item, index) => (
                        <div className={this.props.className}
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
    this.clearForm    = this.clearForm.bind(this);
    this.resetMirror   = this.resetMirror.bind(this);
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
          <CharacteristicsInputField className="suggestion-left"  onChange={this.handleChange} name="characteristic1" />
          {//<input type="text" name="characteristic1" value={this.state.characteristic1} onChange={this.handleChange}/>
          }
          <CharacteristicsInputField className="suggestion-left"  onChange={this.handleChange} name="characteristic2" />
            {/*<input className="test-input" type="text" name="hobby1"          value={this.state.hobby1}          onChange={this.handleChange}/>*/}<br />
          <input className="test-input-other" type="text" name="characteristic2" value={this.state.characteristic2} onChange={this.handleChange}/>
          <input className="test-input-other" type="text" name="hobby2"          value={this.state.hobby2}          onChange={this.handleChange}/><br />
          <input className="test-input-other" type="text" name="characteristic3" value={this.state.characteristic3} onChange={this.handleChange}/>
          <input  className="test-input-other" type="text" name="hobby3"          value={this.state.hobby3}          onChange={this.handleChange}/><br />
          <input type="submit" value="Generate" />
        </form>
        <LowerButtonRow clearForm={this.clearForm} resetMirror={this.resetMirror}/>
      </div>

    );
  }
}
export {Form};
