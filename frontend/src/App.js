import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Start = () => <h2>Who are you?</h2>;
const Mirror = () => <h2>That is you</h2>;
const VisualizeResults = () => <h2>That is why it is you</h2>;

const AppRouter = () => (
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
      <Route path="/mirror/" component={Mirror} />
      <Route path="/visualization/" component={VisualizeResults} />
    </div>
  </Router>
);
export default AppRouter;