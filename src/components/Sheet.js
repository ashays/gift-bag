import React from 'react';
import './Sheet.css';

class Sheet extends React.Component {   
  render() {
    let customColorStyles = ".drawer { background: #" + this.props.color + "; } .drawer::after { background-image: url(\"data:image/svg+xml;utf8,<svg width='8' height='9' viewBox='0 0 8 9' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M8 0H0V1L4 9L8 1V0Z' fill='%23333333' fill-opacity='0.25'/><path d='M4 8L8 0H0L4 8Z' fill='%23" + this.props.color + "'/></svg>\"); }";
    return (
      <div className={this.props.isOpen ? "slide open" : "slide closed"}>
        <style>{customColorStyles}</style>
        <div className="overlay" onClick={this.props.close} />
        <div className="drawer">
          <div className="contents">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Sheet;