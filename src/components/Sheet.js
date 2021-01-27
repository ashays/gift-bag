import React from 'react';
import './Sheet.css';

class Sheet extends React.Component { 
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.closeSheet = this.closeSheet.bind(this);
  }

  componentDidMount() {
    setTimeout( () => { this.setState({isOpen: true}); }, 300);
  }

  closeSheet() {
    this.setState({isOpen: false});
  }
  
  render() {
    return (
      <div className={this.state.isOpen ? "slide open" : "slide closed"}>
        <div className="overlay" onClick={this.closeSheet} />
        <div className="drawer">
          {this.props.children}
          {this.props.close && (<div onClick={this.closeSheet}>{this.props.close}</div>)}
        </div>
      </div>
    );
  }
}

export default Sheet;