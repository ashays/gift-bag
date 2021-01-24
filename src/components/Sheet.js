import React from 'react';
import './Sheet.css';

class Sheet extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    }
    this.closeSheet = this.closeSheet.bind(this);
  }

  closeSheet() {
    this.setState({isOpen: false});
  }
  
  render() {
    return (
      <div className={this.state.isOpen ? "slide open" : "slide closed"}>
        <div className="overlay" onClick={this.closeSheet} />
        <div className="drawer">
          <h2>Looking for a gift?</h2>
          <p>We believe in a better way to find the perfect gift—one that focuses on the humans instead of the products. Explore a curated selection of hand-selected items, each meeting our rigorous standards of a thoughtful gift. We may earn an affiliate commission if you buy something using these links.</p>
          <div className="button" onClick={this.closeSheet}>Start browsing gifts</div>
        </div>
      </div>
    );
  }
}

export default Sheet;