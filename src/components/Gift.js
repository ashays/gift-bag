import React from 'react';
import { Link, withRouter } from "react-router-dom";
import './Gift.css';
import Icon from "./Icon";
import {PERSONAS, GIFTS} from '../data/data';


class Gift extends React.Component {
    constructor(props) {
        super(props);
        let gift = this.getGift(), persona = this.getPersona(gift);
        this.state = {
            gift,
            persona,
            visited: false
        };
        this.checkingItOut = this.checkingItOut.bind(this);
        this.openPersonaPage = this.openPersonaPage.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id || this.props.match.params.id !== prevProps.match.params.id) {
            let gift = this.getGift(), persona = this.getPersona(gift);
            this.setState({ gift, persona, visited: false });
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
            let siteName = siteParts[siteParts.length - 2] + "." + siteParts[siteParts.length - 1];
            if (siteName.length < 20) {
                // TODO long site names show up on desktop
                return siteName;
            }
        }
        return undefined;
    }

    checkingItOut() {
        this.setState({ visited: true });
        // Google analytics
        window.gtag('event', 'view_item', {
            items: [{
                item_id: this.props.id,
                item_name: this.state.gift.name,
                item_brand: this.state.gift.brand,
                item_category: this.state.gift.category,
                price: this.state.gift.price.length
            }]
        });
    }

    getPersonaUrl(persona) {
        return ("/" + encodeURIComponent(persona.trim().replace(/\W+/g, '-').toLowerCase()));
    }

    openPersonaPage() {
        window.scrollTo(0, 0);
        this.props.closeSheet(false);
        let title = "Gifts for the " + this.state.persona + " / Piñata Gifts";
        document.title = title;
        // Google analytics
        window.gtag('config', window.googleTrackingId, {
            page_title: title,
            page_path: this.getPersonaUrl(this.state.persona)
        });
    }

    getPersonaElement() {
        if (this.props.expanded) {
            return <Link onClick={this.openPersonaPage} to={this.getPersonaUrl(this.state.persona)}>{this.state.persona}</Link>
        } else {
            return this.state.persona;
        }
    }

    render() {
        return (
            <div className="gift">
                <Icon name={this.state.gift.category} />
                <div className="reference">
                    {!this.props.hidePersona && this.state.persona && <span>For the {this.getPersonaElement()}</span>}
                    {this.state.gift.category && <span>{this.state.gift.category}</span>}
                </div>
                <h2>{this.state.gift.name}</h2>
                <div className="about">
                    {this.state.gift.brand && <span>by {this.state.gift.brand}</span>}
                    {this.state.gift.price && <span>{this.state.gift.price}</span>}
                    {!this.props.expanded && <span className="pseudolink">details</span>}
                </div>
                {this.props.expanded && !this.state.visited && this.state.gift.link && <a href={this.state.gift.link} target="_blank" className="button" rel="noopener noreferrer" onClick={this.checkingItOut}>Check it out {this.getSiteName(this.state.gift.link) && (<span>at <span className="pseudolink">{this.getSiteName(this.state.gift.link)}</span></span>)}</a>}
                {this.props.expanded && this.state.visited &&
                    <div className="react" onClick={this.props.closeSheet}>
                        <Icon name="Thumbs Up" /><Icon name="Thumbs Down" />
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(Gift);