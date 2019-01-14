import React, {Component} from 'react';
import './App.css';
import {Start} from './startPage';
import Mirror from './Mirror.js';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const VisualizeResults = () => <h2>That is why it is you</h2>;

class AppRouter extends Component {
  
  constructor() {
    super();
    
    this.userStats = {
      mentalStat: "unknown",
      hairColor: "unknown"
    }

    this.calculateReflection = this.calculateReflection.bind(this);
  }

  calculateReflection = (mentalStat) => {
    this.userStats.mentalStat = mentalStat;
    // ask the Server
    // this.userStats.hairColor = getModell/Haircolor(mentalstat)
    this.userStats.hairColor = mentalStat === "creative" ? "pink" : "green";
  }

  render() {
    const shownLinks =
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
      </nav>;
    return (
      <Router>
        <React.Fragment>
          {shownLinks}
            <Route path="/" exact component={() => <Start calculateReflection={this.calculateReflection}/>} />
            <Route
                    path="/mirror"
                    component={() => <Mirror color={this.userStats.hairColor}/>}
              />
            <Route path="/visualization/" component={VisualizeResults} />
        </React.Fragment>
      </Router>
    );
  }
}

export default AppRouter;
