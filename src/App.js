import React from 'react';
import './App.css';

import Main from "./components/Main";
import Sheet from "./components/Sheet";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSheetOpen: false
    };
  }
  
  closeSheet() {
    this.setState({isSheetOpen: false});
  }

  render() {
    return (
      <div>
        <header>
          <img src={process.env.PUBLIC_URL + '/logo.svg'} />
          <div className="app-name">Pi&ntilde;ata</div>
          <div className="subtitle">Gift Guide</div>
        </header>
        <Main />
        <Sheet isOpen={this.state.isSheetOpen} close={this.closeSheet.bind(this)} />
      </div>
    );
  }
}

export default App;
