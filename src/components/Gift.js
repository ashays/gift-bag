import React from 'react';
import './Gift.css';

class Gift extends React.Component {
  goToGift() {
    console.log("clicked link " + this.props.id);
    // Some UI change for recently viewed gifts
  }

  saveGift(e) {
    e.preventDefault();
    console.log("Save gift here");
  }

  render() {
    return (
      <a className="gift" onClick={this.goToGift.bind(this)} href={this.props.link} target="_blank" alt={this.props.title} rel="noopener noreferrer">
        <div className="title">{this.props.title}</div>
        <span>{this.props.description}</span>
        <div className="save" onClick={this.saveGift.bind(this)}>
          <svg viewBox="0 0 24 24"><path d="M17.016 18v-12.984h-10.031v12.984l5.016-2.203zM17.016 3q0.797 0 1.383 0.609t0.586 1.406v15.984l-6.984-3-6.984 3v-15.984q0-0.797 0.586-1.406t1.383-0.609h10.031z"></path></svg>
        </div>
      </a>
    );
  }
}

export default Gift;