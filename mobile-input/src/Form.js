import React from 'react';
import './Form.css';
import './Screens.css';
import Downshift from 'downshift';


const LowerButtonBar = props => {
  return(
    <React.Fragment>
    <input type="button" value="reset" id="left" disabled={!props.canReset} onClick={props.resetMirror}/>
    <input type="button" value="more" id="right" disabled={!props.isActive} onClick={props.handleMore}/>
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
      };
      this.lastRequestedContent = "";
      this.updateSuggestions = this.updateSuggestions.bind(this);
      this.onInputChoice = this.onInputChoice.bind(this);
  }

  onInputChoice(event){
    this.props.onInputChoice(this.props.name, event);
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
                              placeholder: this.props.placeholder,
                              onChange: this.props.onChange})
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
    this.onInputChoice = this.onInputChoice.bind(this);
  }

  onInputChoice(name, value) {
    this.props.handleChange(name, value);
  }

  handleChange(event) {
    this.props.handleChange(event.target.name, event.target.value);
  }

  render() {
    return (
      <div className="container">
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
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="0" value={this.props.values[0]} placeholder="ex. intelligent"/>
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="1" value={this.props.values[1]} placeholder="ex. arrogant"/>
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="2" value={this.props.values[2]} placeholder="ex. open-minded"/>
            </div>
            <div className="grid-element">
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="3" value={this.props.values[3]} placeholder="ex. golf"/>
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="4" value={this.props.values[4]} placeholder="ex. cooking"/>
              <CharacteristicsInputField onInputChoice={this.onInputChoice} onChange={this.handleChange} name="5" value={this.props.values[5]} placeholder="ex. cinema"/>
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
