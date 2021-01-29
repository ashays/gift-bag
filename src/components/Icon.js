import React from 'react';

import beverage from '../icons/beverage.svg';
import book from '../icons/book.svg';
import clean from '../icons/clean.svg';
import decor from '../icons/decor.svg';
import desk from '../icons/desk-accessory.svg';
import food from '../icons/food.svg';
import game from '../icons/game.svg';
import plant from '../icons/plant.svg';
import speaker from '../icons/speaker.svg';


class Icon extends React.Component {
    render() {
        let iconMap = {
            "Something to drink": beverage,
            "Something to read": book,
            "Something to stay clean": clean,
            "Something to stay fresh": clean,
            "Something to decorate the home": decor,
            "Something for the desk": desk,
            "Something to eat": food,
            "Something to play": game,
            "Something to grow": plant,
            "Something to jam out": speaker
        }
        if (iconMap[this.props.name])
            return <img src={iconMap[this.props.name]} />;
        return <span></span>
    }
}

export default Icon;