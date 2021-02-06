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
import Quiz from "./components/Quiz";
import Persona from "./components/Persona";
import Sheet from "./components/Sheet";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sheetOpen: false,
      personas: [],
      prices: {'$': true, '$$': true, '$$$': true, '$$$$': true},
      recipientName: "",
      currentGiftId: undefined,
      giftIndex: Math.floor(Math.random()*21)
    };
    this.openSheet = this.openSheet.bind(this);
    this.closeSheet = this.closeSheet.bind(this);
    this.openGift = this.openGift.bind(this);
    this.selectPersona = this.selectPersona.bind(this);
    this.selectPrice = this.selectPrice.bind(this);
  }

  componentDidMount() {
    setTimeout( () => {
      this.openSheet();
      document.body.style.position = "fixed";
    }, 300);
  }

  openSheet() {
    this.setState({ sheetOpen: true });
    document.body.style.overflow = "hidden";
  }

  closeSheet() {
    this.setState({sheetOpen: false});
    document.body.style.overflow = "visible";
    document.body.style.position = "initial";
    if (this.props.location.pathname.substr(0,6) === "/gift/") {
      // If initial page is a gift, go home
      this.props.history.push("/");
    } else {
      // Otherwise, go back to initial page
      this.props.history.push(this.props.location.pathname);
    }
  }

  openGift(id, giftIndex, e) {
    this.openSheet();
    this.setState({currentGiftId: id, giftIndex});
  }

  getSheetColor() {
    let colors = ["EF767A", "EEB868", "4F518C", "49BEAA", "456990"];
    if (this.state.giftIndex !== undefined) {
      return colors[(this.state.giftIndex + 1) % colors.length];
    }
    return colors[Math.floor(Math.random()*colors.length)];
  }

  selectPersona(e) {
    let id = e.target.dataset.id;
    let checked = e.target.checked;
    this.setState(prevState => {
      let personas = prevState.personas;
      let idIndex = prevState.personas.indexOf(id);
      if (!checked && idIndex > -1) {
        // Not selected but in selected array
        prevState.personas.splice(idIndex, 1);
        personas = [...prevState.personas];
      } else if (checked && idIndex === -1) {
        // Selected but not in selected array
        prevState.personas.push(id);
        personas = [...prevState.personas];
      }
      return {personas};
    });
  }

  selectPrice(e) {
    let id = e.target.dataset.id;
    let checked = e.target.checked;
    this.setState(prevState => {
        prevState.prices[id] = checked;
        return {prices: {...prevState.prices}};
    });
  }

  render() {
    return (
      <Router>
        <Route path="/:persona?/:giftid?/">
          <header>
            <div className="logo">
              <Link to="/" onClick={this.openSheet}><div className="app-name">Pi&ntilde;ata</div></Link>
              <div className="subtitle">Gift Guide</div>
            </div>
            <Persona />
          </header>
          <Main openGift={this.openGift} personas={this.state.personas} prices={this.state.prices} />
          <Sheet isOpen={this.state.sheetOpen} close={this.closeSheet} color={this.getSheetColor()}>
            <Switch>
              <Route path="/gift/:id/">
                <Gift id={this.state.currentGiftId} index={this.state.giftIndex} expanded={true} closeSheet={this.closeSheet} />
              </Route>
              <Route path="/:persona">
                <h2>Looking for a gift?</h2>
                <p>We believe in a better way to find the perfect gift—one that focuses on the humans instead of the products. Explore our curated selection of hand-selected items from our favorite brands. We may earn an affiliate commission if you buy something using these links.</p>
                <div className="button" onClick={this.closeSheet}>Start browsing gifts</div>
              </Route>  
              <Route path="/">
                <Quiz closeSheet={this.closeSheet} personas={this.state.personas} selectPersona={this.selectPersona} prices={this.state.prices} selectPrice={this.selectPrice} />
              </Route>  
            </Switch>
          </Sheet>
        </Route>
      </Router>
    );
  }
}

export default withRouter(App);
