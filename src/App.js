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
        <Sheet />
      </div>
    );
  }
}

export default App;
