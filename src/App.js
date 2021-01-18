import React from 'react';
import './App.css';

import Results from "./components/Results";
import Sheet from "./components/Sheet";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSheetOpen: false
    };
  }
  
  closeSheet() {
    let newState = this.state;
    newState.isSheetOpen = false;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <Results />
        <Sheet isOpen={this.state.isSheetOpen} close={this.closeSheet.bind(this)} />
      </div>
    );
  }
}

export default App;
