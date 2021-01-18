import React from 'react';
import Group from "./Group";
import GIFTS from '../data/gifts';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.gifts = GIFTS;
  }

  render() {
    let allGifts = Object.entries(this.gifts);
    let previewGifts = [];
    allGifts.forEach((n) => {
      previewGifts.push({
        name: n[0],
        description: n[1].description,
        gifts: n[1].gifts.slice(0,2),
        noGifts: n[1].gifts.length
      });
    });
    return (
      <main>
        {previewGifts.map(function(group, i) {
          return (
            <Group title={group.name} description={group.description} noGifts={group.noGifts} gifts={group.gifts} />
          );
        })}
      </main>
    );
  }
}

export default Main;