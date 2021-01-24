import React from 'react';
import { withRouter } from "react-router-dom";
import './Group.css';
import {PERSONAS} from '../data/gifts';

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.openGiftPage = this.openGiftPage.bind(this);
    }

    openGiftPage() {
        this.props.history.push(
            "/gift/" + this.props.id + "/" + encodeURIComponent(this.props.name.toLowerCase()),
            { bottomSheetOpen: true }
        );
    }

    render() {
        let persona;
        if (this.props.personas) {
            persona = PERSONAS[this.props.personas[Math.floor(Math.random()*this.props.personas.length)]].name;
        }
        return (
            <a className="group" href={this.props.link} onClick={this.openGiftPage} target="_blank" alt={this.props.name} rel="noopener">
                <div className="reference">
                    {persona && <span>For the {persona}</span>}
                    {this.props.category && <span>{this.props.category}</span>}
                </div>
                <h2>{this.props.name}</h2>
                <div className="about">
                    {this.props.brand && <span>by {this.props.brand}</span>}
                    {this.props.price && <span>{this.props.price}</span>}
                </div>
            </a>
        );
    }
}

export default withRouter(Group);