import React, { Component } from 'react';
import './card-container.scss'

export class CardContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="inbox">
        <div className="inbox-title">
          {this.props.title}
        </div>
        <div className="inbox-body">
          <div className="inbox-subtitle">{this.props.subTitle}</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}