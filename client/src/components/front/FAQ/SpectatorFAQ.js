import React, { Component } from 'react';
import { json } from "./SpectatorData";
import FAQ from "./FAQ";
import "./FAQ.css";

class SpectatorFAQ extends Component {

  render() {

    const that = this;

    return (
      <div>
        <ul className="list pl0">
        {
          json().map(function(faq) {
            return(
              <FAQ header={faq.header} content={faq.content} />
            )
          })
        }
        </ul>
      </div>
    );

  }
}

export default SpectatorFAQ;
