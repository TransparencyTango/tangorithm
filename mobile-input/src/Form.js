import React from 'react';
import './Form.css';
import './Screens.css';
import Downshift from 'downshift';


const LowerButtonBar = props => {
  return(
    <React.Fragment>
    <input type="button" value="reset" id="reset_1" disabled={!props.canReset} onClick={props.resetMirror}/>
    <input type="button" value="more" id="more" disabled={!props.isActive} onClick={props.handleMore}/>
    </React.Fragment>
  );
}

const GenerateButton = props => {
  return(
    <React.Fragment>
      <input id="generate" value="" form="form0" type="submit" disabled={!props.isActive}/>
    </React.Fragment>
  );
}

class CharacteristicsInputField extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        suggestions: [],
        //content: this.props.value
      };
      this.lastRequestedContent = "";
      this.updateSuggestions = this.updateSuggestions.bind(this);
      this.onInputChoice = this.onInputChoice.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  onInputChoice(event){
    this.props.onInputChoice(this.props.name, event);
  }

  handleChange(event) {
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
                              value: this.props.value,
                              onChange: this.handleChange})
                        }
                        onFocus={this.props.onFocus}
                        />
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

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChoice = this.onInputChoice.bind(this);
    // this.clearForm    = this.clearForm.bind(this);
  }

  componentDidMount() {
  let inputFields = document.getElementsByTagName('input');
  for(let i=0; i<inputFields.length; i++){
    if (inputFields[i].getAttribute('type') === 'text' && !/^ex. /.test(inputFields[i].value)){
      inputFields[i].style.color = "black";
    }
  }
}

  onInputChoice(name, value) {
    this.props.handleChange(name, value);
  }

  handleChange(event) {
    this.props.handleChange(event.target.name, event.target.value);
  }

  // handleSubmit(event){
  //   event.preventDefault();
  //   fetch('postAttributes?words=' + Object.values(this.state).join(' '),{
  //       method: "POST",
  //     }).catch((error) => console.error(error));
  // }

  // clearForm() {
  //   this.setState(this.initialState);
  // }

  render() {
    return (
      <div className="Container">
        <div>
          <h1> Please tell me a few things about yourself </h1>
        </div>
        <div className="grid-container">
            <p> Which characteristics describe you the best? </p>
            <p> What kind of interests do you have? </p>
        </div>
        <form id="form0" onSubmit={this.props.handleSubmit}>
          <div className="grid-container">
            <div className="grid-element">
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="0" value={this.props.values[0]} onFocus={this.props.removeBackground}/>
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="1" value={this.props.values[1]} onFocus={this.props.removeBackground}/>
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="2" value={this.props.values[2]} onFocus={this.props.removeBackground}/>
            </div>
            <div className="grid-element">
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="3" value={this.props.values[3]} onFocus={this.props.removeBackground}/>
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="4" value={this.props.values[4]} onFocus={this.props.removeBackground}/>
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="5" value={this.props.values[5]} onFocus={this.props.removeBackground}/>
            </div>
          </div>
        </form>
        <GenerateButton isActive={this.props.buttonsState.canSend}/>
        <div className="LowerButtonBar">
          <LowerButtonBar isActive={this.props.buttonsState.hasSent} canReset={this.props.buttonsState.canReset} resetMirror={this.props.handleReset} handleMore={this.props.handleMore}/>
        </div>
      </div>
    );
  }

}
export {Form};
