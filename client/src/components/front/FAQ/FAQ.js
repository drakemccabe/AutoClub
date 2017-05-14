import React, { Component } from 'react';


class FAQ extends Component {

  render() {

    return (
      <li className="pa3 pa4-ns bb b--black-10">
        <b className="db f3 mb1">{this.props.header}</b>
        <span className="f5 db lh-copy measure">{this.props.content}</span>
      </li>
    );

  }
}

export default FAQ;
