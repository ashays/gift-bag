import React from 'react';
import { withRouter } from "react-router-dom";
import './Gift.css';
import {PERSONAS} from '../data/gifts';
import {GIFTS} from '../data/gifts';

class Gift extends React.Component {
    constructor(props) {
        super(props);
        let gift = this.getGift(), persona = this.getPersona(gift);
        this.state = { gift, persona };
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id || this.props.match.params.id !== prevProps.match.params.id) {
            let gift = this.getGift(), persona = this.getPersona(gift);
            this.setState({ gift, persona });
        }
    }

    getGift() {
        if (this.props.id) {
            return GIFTS[this.props.id];
        } else if (this.props.match.params.id) {
            return GIFTS[this.props.match.params.id];
        }
        return undefined;
    }

    getPersona(gift) {
        return PERSONAS[gift.personas[Math.floor(Math.random()*gift.personas.length)]].name;
    }
    
    render() {
        return (
            <div className="gift">
                <div className="reference">
                    {this.state.persona && <span>For the {this.state.persona}</span>}
                    {this.state.gift.category && <span>{this.state.gift.category}</span>}
                </div>
                <h2>{this.state.gift.name}</h2>
                <div className="about">
                    {this.state.gift.brand && <span>by {this.state.gift.brand}</span>}
                    {this.state.gift.price && <span>{this.state.gift.price}</span>}
                </div>
                {this.props.expanded && this.state.gift.link && <a href={this.state.gift.link} target="_blank" className="button" rel="noopener noreferrer">Check it out</a>}
            </div>
        );
    }
}

export default withRouter(Gift);