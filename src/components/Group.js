import React from 'react';
import './Group.css';
import Gift from "./Gift";

class Group extends React.Component {
    render() {
        let button;
        if (this.props.noGifts > 2) {
            button = (<a href="#" className="ghost-btn">See all {this.props.noGifts} gift ideas</a>);
        }
        return (
            <div className="group">
                <h2>For the <strong>{this.props.title}</strong></h2>
                <p>{this.props.description}</p>
                {this.props.gifts.map(function(gift, i) {
                    return (
                        <Gift title={gift.name} link={gift.link} brand={gift.brand} price={gift.price} key={i} />
                    );
                })}
                {button}
            </div>
        );
    }
}

export default Group;