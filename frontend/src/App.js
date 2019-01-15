import React, {Component} from 'react';
import './App.css';
import Mirror from './Mirror.js';
import Modeldemo from './Modeldemo';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AppRouter extends Component {
  
  constructor() {
    super();
  }

  render() {
    const shownLinks =
      <nav>
          <ul>
            <li>
              <Link to="/mirror/">Mirror</Link>
            </li>
          </ul>
      </nav>;
    return (
      <Router>
        <React.Fragment>
          {shownLinks}
            <Route
                    path="/mirror"
                    component={() => <Mirror/>}
              />
            <Route path="/modeldemo/" component={Modeldemo} />
        </React.Fragment>
      </Router>
    );
  }
}

export default AppRouter;
