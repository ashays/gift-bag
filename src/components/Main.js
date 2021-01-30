import React from 'react';
import './Main.css';
import Gift from "./Gift";
import {GIFTS} from '../data/data';
import { Link, withRouter } from 'react-router-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.gifts = GIFTS;
    this.currentGifts = this.getRandom(Object.keys(this.gifts), 30);
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
        {this.currentGifts.map((giftId, i) => {
          return (
            <Link className="block" onClick={this.props.openGift.bind(this, giftId, i)} to={this.getGiftURL(giftId, this.gifts[giftId].name)} key={giftId}>
              <Gift id={giftId} index={i} />
            </Link>
          );
        })}
      </main>
    );
  }
}

export default withRouter(Main);