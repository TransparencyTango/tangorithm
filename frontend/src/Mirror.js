import React, { Component } from 'react';

var pics = {
  "unknown":  require('./img/unknown_person.jpg'),
  "pink":     require('./img/pink_hair.jpg'),
  "green":    require('./img/green_hair.jpg'),
};

class Mirror extends Component {

  render() {
    return (
      <div>
        <h2>That is you</h2>
        <p>
          <img src={pics[this.props.person]} alt="" />
        </p>
        {//<p>
          //Haircolor: {this.props.color}
        //</p>
        }
      </div>
    );
  }

}

export default Mirror;