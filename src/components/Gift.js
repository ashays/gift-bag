import React from 'react';
import { withRouter } from "react-router-dom";
import './Gift.css';
import {PERSONAS} from '../data/gifts';
import {GIFTS} from '../data/gifts';

class Gift extends React.Component {
    render() {
        if (this.props.id) {
            this.GIFT = GIFTS[this.props.id];
        } else if (this.props.match.params.id) {
            this.GIFT = GIFTS[this.props.match.params.id];
        }
        let persona = PERSONAS[this.GIFT.personas[Math.floor(Math.random()*this.GIFT.personas.length)]].name;
        return (
            <div className="gift">
                <div className="reference">
                    {persona && <span>For the {persona}</span>}
                    {this.GIFT.category && <span>{this.GIFT.category}</span>}
                </div>
                <h2>{this.GIFT.name}</h2>
                <div className="about">
                    {this.GIFT.brand && <span>by {this.GIFT.brand}</span>}
                    {this.GIFT.price && <span>{this.GIFT.price}</span>}
                </div>
                {this.props.expanded && this.GIFT.link && <a href={this.GIFT.link} target="_blank" className="button" rel="noopener noreferrer">Check it out</a>}
            </div>
        );
    }
}

export default withRouter(Gift);