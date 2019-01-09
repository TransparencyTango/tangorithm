import React from 'react';
import {Redirect} from "react-router-dom";

class Start extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
                mentalStat: 'analytic',
                toMirror: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({mentalStat: event.target.value});
    }

    handleSubmit(event) {
        this.props.calculateReflection(this.state.mentalStat);
        this.setState({toMirror: true});
        event.preventDefault();
    }

  render() {
    // after submitting go to the mirror
    if (this.state.toMirror) {
        return (<Redirect to="mirror/" />);
    }

    return (
        <React.Fragment>
            <h2>Who are you?</h2>
            <div>I am </div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    <select value={this.state.mentalStat} onChange={this.handleChange}>
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
export {Start};
