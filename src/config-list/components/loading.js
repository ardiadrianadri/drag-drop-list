import React, { Component } from 'react';

import './loading.scss';

export class Loading extends Component {

  render () {
    return (
      <div className="loading">
        <img src="images/loading.gif" className="loading-gif"/>
      </div>
    );
  }
}