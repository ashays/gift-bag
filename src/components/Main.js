import React from 'react';
import './Main.css';
import Gift from "./Gift";
import { GIFTS, PERSONA_NAMES, PERSONAS } from '../data/data';
import { Link, withRouter } from 'react-router-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.gifts = GIFTS;
    let persona = this.getPersona(props.match.params['persona']);
    this.state = {
      persona: persona ? true : false,
      currentGifts: this.getCurrentGits(persona)
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.personas !== prevProps.personas || this.props.prices !== prevProps.prices || (this.props.match.params['persona'] !== prevProps.match.params['persona'] && this.props.match.params['persona'] !== "gift")) {
      let persona = this.getPersona(this.props.match.params['persona']);
      this.setState({
        persona: persona ? true : false,
        currentGifts: this.getCurrentGits(persona)
      });
    }
  }

  getPersona(param) {
    if (param) {
      let pId = PERSONA_NAMES[decodeURIComponent(param)];
      return PERSONAS[pId];
    }
  }

  getCurrentGits(persona) {
    let currentGifts = [];
    let pricesSelected = false;
    if (Object.values(this.props.prices).reduce((numSel, selected) => (numSel + (selected ? 1 : 0)), 0) < 4) {
      pricesSelected = true;
    }
    if (persona) {
      if (!pricesSelected) {
        currentGifts = persona.gifts;
      } else {
        persona.gifts.forEach((gId) => {
          if (this.props.prices[GIFTS[gId].price]) {
            currentGifts.push(gId);
          }
        });
      }
      this.shuffleArray(currentGifts);
    } else if (this.props.personas.length) {
      // If any selected personas
      let giftCount = {};
      this.props.personas.forEach((pId) => {
        PERSONAS[pId].gifts.forEach((gId) => {
          if (giftCount.hasOwnProperty(gId)) {
            giftCount[gId]++;
          } else if (!pricesSelected || this.props.prices[GIFTS[gId].price]) {
            giftCount[gId] = 1;
            currentGifts.push(gId);
          }
        });
      });
      this.shuffleArray(currentGifts);
      currentGifts.sort((a, b) => (giftCount[b] - giftCount[a]))
    } else {
      currentGifts = this.getRandom(Object.keys(GIFTS), 32);
    }
    return currentGifts;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len) {
      throw new RangeError("getRandom: more elements taken than available");
    }
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  getGiftURL(id, name) {
    return ("/gift/" + id + "/" + encodeURIComponent(name.trim().replace(/\W+/g, '-').toLowerCase()));
  }

  render() {
    return (
      <main>
        {this.state.currentGifts.map((giftId, i) => {
          return (
            <Link className="block" onClick={this.props.openGift.bind(this, giftId, i)} to={this.getGiftURL(giftId, this.gifts[giftId].name)} key={giftId}>
              <Gift id={giftId} index={i} hidePersona={this.state.persona} />
            </Link>
          );
        })}
      </main>
    );
  }
}

export default withRouter(Main);