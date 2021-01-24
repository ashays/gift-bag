import React from 'react';
import './Sheet.css';

class Sheet extends React.Component {  
  render() {
    return (
     <div className="slide">
          <div className="overlay" onClick={this.props.close} />
          <div className="drawer">
            <h2>Looking for a gift?</h2>
            <p>We believe in a better way to find the perfect gift—one that focuses on the humans instead of the products. Explore a curated selection of hand-selected items, each meeting our rigorous standards of a thoughtful gift. We may earn an affiliate commission if you buy something using these links.</p>
            <div className="button" onClick={this.props.close}>Start browsing gifts</div>
          </div>
        </div>
    );
  }
}

export default Sheet;