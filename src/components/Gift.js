import React from 'react';
import './Gift.css';

class Gift extends React.Component {
  render() {
    return (
      <a className="gift" href={this.props.link} target="_blank" alt={this.props.title} rel="noopener noreferrer">
        <div className="title">{this.props.title}</div>
        <span>{this.props.description}</span>
      </a>
    );
  }
}

export default Gift;