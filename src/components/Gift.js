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
        <div className="save" onClick={this.saveGift.bind(this)}>
          <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.99658 1V0L0.996582 1H1.99658ZM15.9966 1H16.9966L15.9966 0V1ZM1.99658 20H0.996582L2.70369 20.7071L1.99658 20ZM8.99658 13L9.70369 12.2929H8.28948L8.99658 13ZM15.9966 20L15.2895 20.7071L16.9966 20H15.9966ZM1.99658 2H15.9966V0H1.99658V2ZM2.99658 13V1H0.996582V13H2.99658ZM2.99658 20V13H0.996582V20H2.99658ZM8.28948 12.2929L1.28948 19.2929L2.70369 20.7071L9.70369 13.7071L8.28948 12.2929ZM16.7037 19.2929L9.70369 12.2929L8.28948 13.7071L15.2895 20.7071L16.7037 19.2929ZM14.9966 13V20H16.9966V13H14.9966ZM14.9966 1V13H16.9966V1H14.9966Z" fill="white" fillOpacity="0.5"/>
          </svg>
        </div>
        <div className="title">{this.props.title}</div>
        <span>{this.props.description}</span>
      </a>
    );
  }
}

export default Gift;