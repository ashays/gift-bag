import React from 'react';
import './Quiz.css';
import { PERSONAS } from '../data/data';


class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slide: 0,
            name: "",
            personas: PERSONAS,
            prices: [
                { display: 'Less than $20', selected: false, description: 'Something small ($)' },
                { display: '$20 to $50', selected: false, description: 'Medium ($$)' },
                { display: '$50 to $100', selected: false, description: 'High ($$$)' },
                { display: '$100+', selected: false, description: 'Splurge ($$$$)' }
            ]
        };        
        this.nextSlide = this.nextSlide.bind(this);
        this.selectPersona = this.selectPersona.bind(this);
        this.selectPrice = this.selectPrice.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    nextSlide() {
        this.setState(prevState => ({ slide: prevState.slide + 1 }));
    }

    selectPersona(e) {
        let id = e.target.dataset.id;
        let checked = e.target.checked;
        this.setState(prevState => {
            prevState.personas[id].selected = checked;
            return {personas: prevState.personas};
        });
    }

    selectPrice(e) {
        let id = e.target.dataset.id;
        let checked = e.target.checked;
        this.setState(prevState => {
            prevState.prices[id].selected = checked;
            return {prices: prevState.prices};
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    getOptions() {
        let personaList = Object.keys(this.state.personas);
        // this.shuffleArray(personaList);
        return personaList
    }

    getNumPersonasSelected() {
        return Object.values(this.state.personas).reduce((numSel, {selected}) => (numSel + (selected ? 1 : 0)), 0);
    }

    getNumPricesSelected() {
        return this.state.prices.reduce((numSel, {selected}) => (numSel + (selected ? 1 : 0)), 0);
    }

    updateName(e) {
        this.setState({name: e.target.value});
    }

    render() {
        switch (this.state.slide) {
            case 0:
                return (
                    <div>
                        <h2>Looking for a gift?</h2>
                        <p>We believe in a better way to find the perfect gift—one that focuses on the humans instead of the products. Tell us about who you're getting a gift for, and we'll help you find something they'll love. Or, jump straight in and explore our curated selection of hand-selected items from our favorite brands. We may earn an affiliate commission if you buy something using these links.</p>
                        <div className="button" onClick={this.nextSlide}>Take the quiz</div>
                        <div className="button ghost" onClick={this.props.closeSheet}>or, <span className="pseudolink">start browsing gifts</span></div>
                    </div>
                );
            case 1:
                let numPersonasSelected = this.getNumPersonasSelected();
                return (
                    <div>
                        <h2>Who's the gift for?</h2>
                        <p>Select each that describes the person you're getting the gift for.</p>
                        <div className="shrink">
                            {this.getOptions().map((personaId, i) => {
                                if (PERSONAS[personaId].description) {
                                    return (
                                        <label className="option" key={personaId}>
                                            <input type="checkbox" data-id={personaId} checked={this.state.personas[personaId].selected} onChange={this.selectPersona} />
                                            <span className="checkmark"></span>
                                            <strong>The {PERSONAS[personaId].name}</strong>
                                            {PERSONAS[personaId].description}
                                        </label>
                                    )
                                }
                                return null
                            })}
                        </div>
                        {numPersonasSelected ? <div className="button" onClick={this.nextSlide}>Select {numPersonasSelected}</div> : <span></span>}
                    </div>
                );
            case 2:
                let numPricesSelected = this.getNumPricesSelected();
                return (
                    <div>
                        <h2>What's the budget?</h2>
                        <p>Gifts should feel luxurious at every price bucket, which is why all our gift ideas are at the top of their class.</p>
                        <div className="shrink">
                            {this.state.prices.map((price, i) => (
                                <label className="option" key={i}>
                                    <input type="checkbox" data-id={i} checked={this.state.prices[i].selected} onChange={this.selectPrice} />
                                    <span className="checkmark"></span>
                                    <strong>{price.display}</strong>
                                    {price.description}
                                </label>
                            ))}
                        </div>
                        {numPricesSelected ? <div className="button" onClick={this.nextSlide}>Next</div> : <span></span>}
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2>Give 'em a nickname</h2>
                        <p>As you browse our curated list of gift ideas, save your favorites and reference them later. No emails required!</p>
                        <input placeholder="Nickname" type="text" value={this.state.name} onChange={this.updateName} />
                        {this.state.name !== "" ? <div className="button" onClick={this.props.closeSheet}>Show me the gifts!</div> : <span></span>}
                    </div>
                );
            default:
                return (<span></span>)
        }
    }
}

export default Quiz;