import React, { Component } from 'react';
import "./MessageBox.css";

class MessageBox extends Component {

  render() {
    return (
      <div className="flex items-center justify-center pa4 bg-lightest-blue navy" style={{ display: this.props.error ? 'block': 'none'}}>
        <svg className="w1" data-icon="info" viewBox="0 0 32 32" style={{ fill: "currentcolor" }}>
          <title>{this.props.message}</title>
          <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
        </svg>
        <span className="lh-title ml3">Some info that you want to call attention to.</span>
      </div>
    );
  }
}

export default MessageBox;
