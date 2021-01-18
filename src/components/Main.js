import React from 'react';
import Gift from "./Gift";

class Main extends React.Component {
  render() {
    return (
      <main>
        <div className="group">
          <h2>For the <strong>board gamer</strong></h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis dapibus cursus. Maecenas quis semper dolor. Orci varius natoque penatibus.</p>
          <Gift title="Minimalist playing cards" link="#" brand="Areaware" price="$" />
          <Gift title="Jack Puzzle" link="#" brand="Craighill" price="$$" />
          <a href="#" className="ghost-btn">See all 8 gift ideas</a>
        </div>
        <div className="group">
          <h2>For the <strong>board gamer</strong></h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis dapibus cursus. Maecenas quis semper dolor. Orci varius natoque penatibus.</p>
          <Gift title="Minimalist playing cards" link="#" brand="Areaware" price="$" />
          <Gift title="Jack Puzzle" link="#" brand="Craighill" price="$$" />
          <a href="#" className="ghost-btn">See all 8 gift ideas</a>
        </div>
        <div className="group">
          <h2>For the <strong>board gamer</strong></h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis dapibus cursus. Maecenas quis semper dolor. Orci varius natoque penatibus.</p>
          <Gift title="Minimalist playing cards" link="#" brand="Areaware" price="$" />
          <Gift title="Jack Puzzle" link="#" brand="Craighill" price="$$" />
          <a href="#" className="ghost-btn">See all 8 gift ideas</a>
        </div>
      </main>
    );
  }
}

export default Main;