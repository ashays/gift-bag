import React from 'react';
import './App.css';

import Main from "./components/Main";
import Sheet from "./components/Sheet";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div className="app-name">Pi&ntilde;ata</div>
          <div className="subtitle">Gift Guide</div>
        </header>
        <Main />
        <Sheet close={<div className="button">Start browsing gifts</div>}>
          <h2>Looking for a gift?</h2>
          <p>We believe in a better way to find the perfect gift—one that focuses on the humans instead of the products. Explore a curated selection of hand-selected items, each meeting our rigorous standards of a thoughtful gift. We may earn an affiliate commission if you buy something using these links.</p>
        </Sheet>
      </div>
    );
  }
}

export default App;
