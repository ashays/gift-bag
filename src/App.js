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
      currentGiftId: undefined
    };
    this.openGift = this.openGift.bind(this);
    this.closeSheet = this.closeSheet.bind(this);
    this.selectPersona = this.selectPersona.bind(this);
  }

  componentDidMount() {
    setTimeout( () => {
      this.setState({sheetOpen: true, giftIndex: Math.floor(Math.random()*21)});
      // giftIndex just to set a random initial sheet color
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
    if (this.props.location.pathname.substr(0,6) === "/gift/") {
      // If initial page is a gift, go home
      this.props.history.push("/");
    } else {
      // Otherwise, go back to initial page
      this.props.history.push(this.props.location.pathname);
    }
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

  render() {
    return (
      <Router>
        <Route path="/:persona?/:giftid?/">
          <header>
            <div className="logo">
              <Link to="/"><div className="app-name">Pi&ntilde;ata</div></Link>
              <div className="subtitle">Gift Guide</div>
            </div>
            <Persona />
          </header>
          <Main openGift={this.openGift} personas={this.state.personas} />
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
                <Quiz closeSheet={this.closeSheet} personas={this.state.personas} selectPersona={this.selectPersona} />
              </Route>  
            </Switch>
          </Sheet>
        </Route>
      </Router>
    );
  }
}

export default withRouter(App);
