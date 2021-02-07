import React from 'react';
import './Quiz.css';
import { PERSONAS } from '../data/data';
import { Link } from 'react-router-dom';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slide: 0,
            name: "",
            personaOptions: this.getOptions(),
            priceOptions: [
                { display: 'Less than $20', selected: false, description: 'Something small ($)', 'id': '$' },
                { display: '$20 to $50', selected: false, description: 'Medium ($$)', 'id': '$$' },
                { display: '$50 to $100', selected: false, description: 'High ($$$)', 'id': '$$$' },
                { display: '$100+', selected: false, description: 'Splurge ($$$$)', 'id': '$$$$' }
            ]
        };
        this.nextSlide = this.nextSlide.bind(this);
        this.closeSheet = this.closeSheet.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    nextSlide() {
        this.setState(prevState => ({ slide: prevState.slide + 1 }));
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    getOptions() {
        let personaList = Object.keys(PERSONAS);
        // TODO shuffle with priority to personas with more gifts
        this.shuffleArray(personaList);
        return personaList
    }

    getNumPricesSelected() {
        return Object.values(this.props.prices).reduce((numSel, selected) => (numSel + (selected ? 1 : 0)), 0);
    }

    updateName(e) {
        this.setState({name: e.target.value});
    }

    getPersonaUrl(persona) {
        return ("/" + encodeURIComponent(persona.trim().replace(/\W+/g, '-').toLowerCase()));
    }

    closeSheet() {
        // Google Analytics
        let numPersonasSelected = this.props.personas.length;
        if (numPersonasSelected > 0) {
            // Any filters selected
            let personas = [];
            this.props.personas.forEach((pId) => {
                personas.push(PERSONAS[pId].name);
            })
            let prices = [];
            Object.entries(this.props.prices).forEach(([price, selected]) => {
                if (selected) {
                    prices.push(price);
                }
            });
            window.gtag('event', 'take_quiz', { personas, prices });
        }
        if (numPersonasSelected === 1) {
            let personaName = PERSONAS[this.props.personas[0]].name;
            // Going to Persona Page
            let title = "Gifts for the " + personaName + " / Piñata Gifts";
            document.title = title;
            window.gtag('config', window.googleTrackingId, {
                page_title: title,
                page_path: this.getPersonaUrl(personaName)
            });
        }
        this.setState({ slide: 1 });
        this.props.closeSheet();
    }

    render() {
        let numPersonasSelected = this.props.personas.length;
        let nextBtn = (<span></span>);
        switch (this.state.slide) {
            case 0:
                return (
                    <div>
                        <h2>Looking for a gift?</h2>
                        <p>We believe in a better way to find the perfect gift—one that focuses on the humans instead of the products. Tell us about who you're getting a gift for, and we'll help you find something they'll love. Or, jump straight in and explore our curated selection of hand-selected items from our favorite brands. We may earn an affiliate commission if you buy something using these links.</p>
                        <div className="button" onClick={this.nextSlide}>Take the quiz</div>
                        <div className="button ghost" onClick={this.closeSheet}>or, <span className="pseudolink">start browsing gifts</span></div>
                    </div>
                );
            case 1:
                if (numPersonasSelected === 1) {
                    let personaName = PERSONAS[this.props.personas[0]].name;
                    nextBtn = (<div className="button" onClick={this.nextSlide}>Gifts for "The {personaName}"</div>);
                } else if (numPersonasSelected > 1) {
                    nextBtn = (<div className="button" onClick={this.nextSlide}>Select {numPersonasSelected}</div>);
                }
                return (
                    <div>
                        <h2>Who's the gift for?</h2>
                        <p>Select each that describes the person you're getting the gift for.</p>
                        <div className="shrink">
                            {this.state.personaOptions.map((personaId, i) => {
                                if (PERSONAS[personaId].description) {
                                    return (
                                        <label className="option" key={personaId}>
                                            <input type="checkbox" data-id={personaId} checked={this.props.personas.indexOf(personaId) > -1} onChange={this.props.selectPersona} />
                                            <span className="checkmark"></span>
                                            <strong>The {PERSONAS[personaId].name}</strong>
                                            {PERSONAS[personaId].description}
                                        </label>
                                    )
                                }
                                return null
                            })}
                        </div>
                        {nextBtn}
                    </div>
                );
            case 2:
                numPersonasSelected = this.props.personas.length;
                nextBtn = (<span></span>);
                if (numPersonasSelected === 1) {
                    let personaName = PERSONAS[this.props.personas[0]].name;
                    nextBtn = (<Link to={this.getPersonaUrl(personaName)} className="button" onClick={this.closeSheet}>Show me the gifts!</Link>);
                } else if (numPersonasSelected > 1) {
                    nextBtn = (<div className="button" onClick={this.closeSheet}>Show me the gifts!</div>);
                }
                return (
                    <div>
                        <h2>What's the budget?</h2>
                        <p>Gifts should feel luxurious at every price bucket, which is why all our gift ideas are at the top of their class.</p>
                        <div className="shrink">
                            {this.state.priceOptions.map((price) => (
                                <label className="option" key={price.id}>
                                    <input type="checkbox" data-id={price.id} checked={this.props.prices[price.id]} onChange={this.props.selectPrice} />
                                    <span className="checkmark"></span>
                                    <strong>{price.display}</strong>
                                    {price.description}
                                </label>
                            ))}
                        </div>
                        {nextBtn}
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2>Give 'em a nickname</h2>
                        <p>As you browse our curated list of gift ideas, save your favorites and reference them later. No email required!</p>
                        <input placeholder="Nickname" type="text" value={this.state.name} onChange={this.updateName} />
                        {this.state.name !== "" ? <div className="button" onClick={this.closeSheet}>Show me the gifts!</div> : <span></span>}
                    </div>
                );
            default:
                return (<span></span>)
        }
    }
}

export default Quiz;