import React from 'react';
import Group from "./Group";
import {GIFTS} from '../data/gifts';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.gifts = GIFTS;
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

  render() {
    let allGifts = this.getRandom(Object.values(this.gifts), 30);
    return (
      <main>
        {allGifts.map(function(gift, i) {
          return (
            <Group key={i} name={gift.name} price={gift.price} link={gift.link} personas={gift.personas} category={gift.category} brand={gift.brand} />
          );
        })}
      </main>
    );
  }
}

export default Main;