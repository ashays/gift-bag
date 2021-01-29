import React from 'react';
import { withRouter } from "react-router-dom";
import './Gift.css';
import Icon from "./Icon";
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
        if (gift && this.props.index) {
            return PERSONAS[gift.personas[this.props.index % gift.personas.length]].name;
        } else if (gift) {
            return PERSONAS[gift.personas[Math.floor(Math.random()*gift.personas.length)]].name;
        }
        return undefined;
    }

    getSiteName(url) {
        if (this.props.expanded) {
            let siteParts = new URL(this.state.gift.link).host.split('.');
            return siteParts[siteParts.length - 2] + "." + siteParts[siteParts.length - 1];
        }
    }
    
    render() {
        return (
            <div className="gift">
                <Icon name={this.state.gift.category} />
                <div className="reference">
                    {this.state.persona && <span>For the {this.state.persona}</span>}
                    {this.state.gift.category && <span>{this.state.gift.category}</span>}
                </div>
                <h2>{this.state.gift.name}</h2>
                <div className="about">
                    {this.state.gift.brand && <span>by {this.state.gift.brand}</span>}
                    {this.state.gift.price && <span>{this.state.gift.price}</span>}
                    {!this.props.expanded && <span className="pseudolink">details</span>}
                </div>
                {this.props.expanded && this.state.gift.link && <a href={this.state.gift.link} target="_blank" className="button" rel="noopener noreferrer">Check it out at <span className="pseudolink">{this.getSiteName(this.state.gift.link)}</span></a>}
            </div>
        );
    }
}

export default withRouter(Gift);