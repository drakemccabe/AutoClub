import React, { Component } from 'react';
import Nav from "../Nav/Nav";
import MessageBox from '../MessageBox/MessageBox';
import "./NotFound.css";

class NotFound extends Component {

  constructor() {
    super();
    this.state = {
      message: '',
      error: false
    };
  }

  render() {
    return (
      <div>
        <MessageBox message={this.state.message} error={this.state.error} />
        <Nav />
        <h2>404: Page Not Found</h2>
      </div>
    );
  }
}

export default NotFound;
