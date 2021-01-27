import React from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import Main from "./components/Main";
import Sheet from "./components/Sheet";

class App extends React.Component {
  render() {
    return (
      <Router>
        <header>
          <Link to="/"><div className="app-name">Pi&ntilde;ata</div></Link>
          <div className="subtitle">Gift Guide</div>
        </header>
        <Main />
        <Switch>
          <Route path="/gift/:id/:name">
            <Sheet>
              <h2>Gift page</h2>
            </Sheet>
          </Route>
          <Route exact path="/">
            <Sheet close={<div className="button">Start browsing gifts</div>}>
              <h2>Looking for a gift?</h2>
              <p>We believe in a better way to find the perfect gift—one that focuses on the humans instead of the products. Explore a curated selection of hand-selected items, each meeting our rigorous standards of a thoughtful gift. We may earn an affiliate commission if you buy something using these links.</p>
            </Sheet>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
