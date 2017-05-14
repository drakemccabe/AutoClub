import React, { Component } from 'react';
import { json } from "./DriverData";
import FAQ from "./FAQ";
import "./FAQ.css";


class DriverFAQ extends Component {

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

export default DriverFAQ;
