import React from 'react';
import {
  BrowserRouter as Router, 
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import './App.css';

import Main from "./components/Main";
import Gift from "./components/Gift";
import Sheet from "./components/Sheet";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sheetOpen: false,
      currentGiftId: undefined
    };
    this.openGift = this.openGift.bind(this);
    this.closeSheet = this.closeSheet.bind(this);
  }

  componentDidMount() {
    setTimeout( () => {
      this.setState({sheetOpen: true, giftIndex: Math.floor(Math.random()*21)});
      document.body.style.overflow = "hidden";
    }, 300);
  }

  openGift(id, giftIndex, e) {
    this.setState({sheetOpen: true, currentGiftId: id, giftIndex});
    document.body.style.overflow = "hidden";
  }

  closeSheet() {
    this.setState({sheetOpen: false});
    document.body.style.overflow = "visible";
    this.props.history.push('/');
  }

  getSheetColor() {
    let colors = ["EF767A", "EEB868", "4F518C", "49BEAA", "456990"];
    if (this.state.giftIndex !== undefined) {
      return colors[(this.state.giftIndex + 1) % colors.length];
    }
    return colors[Math.floor(Math.random()*colors.length)];
  }

  render() {
    return (
      <Router>
        <header>
          <Link to="/"><div className="app-name">Pi&ntilde;ata</div></Link>
          <div className="subtitle">Gift Guide</div>
        </header>
        <Main openGift={this.openGift} />
        <Sheet isOpen={this.state.sheetOpen} close={this.closeSheet} color={this.getSheetColor()}>
          <Switch>
            <Route path="/gift/:id/">
              <Gift id={this.state.currentGiftId} index={this.state.giftIndex} expanded={true} closeSheet={this.closeSheet} />
            </Route>
            <Route exact path="/">
              <h2>Looking for a gift?</h2>
              <p>We believe in a better way to find the perfect gift—one that focuses on the humans instead of the products. Explore a curated selection of hand-selected items, each meeting our rigorous standards of a thoughtful gift. We may earn an affiliate commission if you buy something using these links.</p>
              <div className="button" onClick={this.closeSheet}>Start browsing gifts</div>
            </Route>  
          </Switch>
        </Sheet>
      </Router>
    );
  }
}

export default withRouter(App);
