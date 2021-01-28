import React from 'react';
import './Sheet.css';

class Sheet extends React.Component {   
  render() {
    return (
      <div className={this.props.isOpen ? "slide open" : "slide closed"}>
        <div className="overlay" onClick={this.props.close} />
        <div className="drawer">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Sheet;