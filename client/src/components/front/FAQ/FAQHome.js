import React, { Component } from 'react';
import SpectatorFAQ from "./SpectatorFAQ";
import DriverFAQ from "./DriverFAQ";
import Nav from "../Nav/Nav";

class FAQHome extends Component {

  constructor() {
    super();
    this.selectFaq = this.selectFaq.bind(this);
    this.showFaq = this.showFaq.bind(this);
    this.state = {
      faqDisplay: "0"
    }
  }

  selectFaq(event) {
    this.setState({
      faqDisplay: this.selectedFaq.value
    })
  }

  showFaq() {
    if(this.state.faqDisplay == "driver") {
      return <DriverFAQ />
    } else if(this.state.faqDisplay == "spectator") {
      return <SpectatorFAQ />
    } else {
      return null;
    }
  }


  render() {

    const that = this;

    return (
      <div>
        <Nav />
        <h2 className="center-txt">FAQs</h2>
        <div className="select-container">
          <select onChange={this.selectFaq} ref={(input) => this.selectedFaq = input} className="faq-select">
            <option value="0">I am a...</option>
            <option value="driver">driver</option>
            <option value="spectator">spectator</option>
          </select>
        </div>
        <this.showFaq />
      </div>
    );

  }
}

export default FAQHome;
