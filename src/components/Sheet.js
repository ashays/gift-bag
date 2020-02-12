import React from 'react';
import './Sheet.css';

class Sheet extends React.Component {  
  render() {
    return (
     <div className={this.props.isOpen ? "slide open" : "slide closed"}>
          <div className="overlay" onClick={this.props.close} />
          <div className="drawer">
            <h2>Let's find you the perfect gift</h2>
            <h3>Who's the gift for?</h3>
            <div className="options">
              <div className="option">
                <div className="icon" />
                <span>Mixologist</span>
              </div>
              <div className="option">
                <div className="icon" />
                <span>Botanist</span>
              </div>
              <div className="option">
                <div className="icon" />
                <span>Traveler</span>
              </div>
              <div className="option">
                <div className="icon" />
                <span>Chef</span>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Sheet;