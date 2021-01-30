import React from 'react';
import { withRouter } from "react-router-dom";
import './Persona.css';
import {PERSONAS, PERSONA_NAMES} from '../data/data';


class Persona extends React.Component {
    constructor(props) {
        super(props);
        let persona;
        let param = props.match.params['persona'];
        if (param) {
            // There is a persona param in the URL
            let pId = PERSONA_NAMES[decodeURIComponent(param)];
            persona = PERSONAS[pId];
        }
        this.state = { persona };
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