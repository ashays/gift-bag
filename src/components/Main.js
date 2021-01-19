import React from 'react';
import Group from "./Group";
import GIFTS from '../data/gifts';

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

  render() {
    let allGifts = Object.entries(this.gifts);
    let previewGifts = [];
    allGifts.forEach((n) => {
      let allGifts = n[1].gifts;
      let gifts = [];
      if (allGifts.length > 2) {
        // Get random 2
        let itemA = allGifts[Math.floor(Math.random() * allGifts.length)];
        let itemB = itemA;
        while (itemB === itemA) {
          itemB = allGifts[Math.floor(Math.random() * allGifts.length)];
        }
        gifts = [itemA, itemB];
      } else {
        gifts = allGifts;
      }
      previewGifts.push({
        name: n[0],
        description: n[1].description,
        gifts,
        noGifts: n[1].gifts.length
      });
    });
    this.shuffleArray(previewGifts);
    return (
      <main>
        {previewGifts.map(function(group, i) {
          return (
            <Group key={i} title={group.name} description={group.description} noGifts={group.noGifts} gifts={group.gifts} />
          );
        })}
      </main>
    );
  }
}

export default Main;