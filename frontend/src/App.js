import React, {Component} from 'react';
import './App.css';
import {Start} from './startPage';
import Mirror from './Mirror.js';
import Modeldemo from './Modeldemo';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const VisualizeResults = () => <h2>That is why it is you</h2>;

class AppRouter extends Component {
  
  constructor() {
    super();

    this.state = {"imageName": ""};

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
    const hairColorSelection =  ["green", "pink"];

    fetch('getDistances?words=' + mentalStat + ' ' + hairColorSelection.join(' '), {
        method: "GET",
        headers: {
          Accept: "application/text"
        }
      })
      .then((response) => {
        return response.text();
      })
      .then( (text) => {
        const similarities = text.substring(1, text.length -1).split(/\s+/).map(parseFloat);
        // image renders too late due to the direct redirection to 'mirror' after submitting
        this.setState({"imageName": hairColorSelection[similarities.indexOf(Math.max.apply(null, similarities))]});
      })
      .catch((error) => console.error(error));
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
                    component={() => <Mirror color={this.state.imageName}/>}
              />
            <Route path="/visualization/" component={VisualizeResults} />
            <Route path="/modeldemo/" component={Modeldemo} />
        </React.Fragment>
      </Router>
    );
  }
}

export default AppRouter;
