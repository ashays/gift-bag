import React from 'react';
import Gift from "./Gift";

class Results extends React.Component {
  render() {
    return (
      <main>
        <h2>Top Picks</h2>
        <Gift id="0A" title="Front Page Framed" link="https://store.nytimes.com/products/new-york-times-front-page-reprint" description="Straight from The Times archives, framed and unframed reprints are available of more than 58,000 historical front pages published since 1851." />
        <Gift id="4D" title="Bartender Kit" link="https://www.amazon.com/dp/B07B9KLRDC" description="A shaker, a jigger, and a mixer—everything one needs to master the art of mixing cocktails" />
        <Gift id="6E" title="Whiskey Glass Set" description="A quality set of whistkey glasses is what differentiates a hobbiest from a whiskey connoisseur" />
        <Gift id="2C" title="Travel-size DIY Cocktails" description="Treat them to their favorite drinks while 30,000 feet in the air" />
      </main>
    );
  }
}

export default Results;