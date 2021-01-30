import React from 'react';
import { withRouter } from "react-router-dom";
import './Persona.css';
import {PERSONAS, PERSONA_NAMES} from '../data/data';


class Persona extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persona: this.getPersona(props.match.params['persona'])
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params['persona'] !== prevProps.match.params['persona'] && this.props.match.params['persona'] !== "gift") {
            this.setState({
                persona: this.getPersona(this.props.match.params['persona'])
            });
        }
    }

    getPersona(param) {
        if (param) {
            // There is a persona param in the URL
            let pId = PERSONA_NAMES[decodeURIComponent(param)];
            return PERSONAS[pId];
        }
    }

    render() {
        if (this.state.persona) {
            return (
                <div className="persona">
                    <h1>{this.state.persona.name}</h1>
                    <p>{this.state.persona.description}</p>
                </div>
            );    
        } else {
            return (<div></div>);
        }
    }
}

export default withRouter(Persona);