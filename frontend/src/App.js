import React, {Component} from 'react';
import './App.css';
import Mirror from './Mirror.js';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Start = () => <h2>Who are you?</h2>;
const VisualizeResults = () => <h2>That is why it is you</h2>;

class AppRouter extends Component {

  constructor() {
    super();
    this.state = {
      person: "unknown",
    }

    this.receivePersonData = this.receivePersonData.bind(this);
  }

  receivePersonData = (personValue) => {
      this.setState({person: personValue});
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Start</Link>
              </li>
              <li>
                <Link to="/mirror/">Mirror</Link>
              </li>
              <li>
                <Link to="/visualization/">Explanation</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Start} />
          <Route
                path="/mirror"
                component={() => <Mirror  person={this.state.person}/>}
          />
          <Route path="/visualization/" component={VisualizeResults} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;
