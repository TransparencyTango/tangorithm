import React, {Component} from 'react';
import './App.css';
import Mirror from './Mirror.js';
import Modeldemo from './Modeldemo';

import { BrowserRouter as Router, Route} from "react-router-dom";

class AppRouter extends Component {

  render() {
    return (
      <Router>
        <React.Fragment>
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
