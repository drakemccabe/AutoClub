import React, { Component } from 'react';
import "./RunGroup.css";
import Nav from "../Nav/Nav";


class RunGroup extends Component {

  render() {

    const trackState = this.props.live ? "Today at Club Loose North": "Run Group Schedule"

    return (
      <div>
        <Nav />
        <div className="wh-bk">
          <div className="overflow-auto">
            <h2 className="center center-txt white">{trackState}</h2>
            <table className="f6 w-100 sm-txt mw8 center" cellspacing="0">
              <thead>
                <tr className="stripe-dark">
                  <th className="fw6 tl center-txt black pa3 bg-white">TIME</th>
                  <th className="fw6 tl center-txt black pa3 bg-white">GROUP</th>
                </tr>
              </thead>
              <tbody className="lh-copy">
                <tr className="stripe-dark">
                  <td className="pa3">8:30 - 9:00 AM</td>
                  <td className="pa3">MANDATORY DRIVER'S MEETING</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">9:00 - 9:40 AM</td>
                  <td className="pa3">C GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">9:40 - 10:20 AM</td>
                  <td className="pa3">B GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">10:20 - 11:00 AM</td>
                  <td className="pa3">A GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">11:00 - 11:40 AM</td>
                  <td className="pa3">C GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">11:40 - 12:20 PM</td>
                  <td className="pa3">B GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">12:20 - 1:00 PM</td>
                  <td className="pa3">A GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">1:00 - 1:40 PM</td>
                  <td className="pa3">C GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">1:40 - 2:20 PM</td>
                  <td className="pa3">B GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">2:20 - 3:00 PM</td>
                  <td className="pa3">A GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">3:00 - 3:40 PM</td>
                  <td className="pa3">C GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">3:40 - 4:20 PM</td>
                  <td className="pa3">B GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">4:20 - 5:00 PM</td>
                  <td className="pa3">A GROUP</td>
                </tr>
                <tr className="stripe-dark">
                  <td className="pa3">5:00 PM</td>
                  <td className="pa3">NO CARS ON TRACK</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

  }
}

export default RunGroup;
