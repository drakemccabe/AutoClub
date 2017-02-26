import React, { Component } from 'react';
import { formatDate } from "../../../helpers";

class EventDetail extends Component {

  render() {

    const { event } = this.props.details;
    const { bundled } = this.props.details;

    return (
      <div>
        <h2>Register for {event.name}</h2>
        <p>{event.location}</p>
        <p>{formatDate(event.date)}</p>
        {
          bundled.map(function(bundle) {
            return bundle.name;
          })
        }
      </div>
    );
  }
}

export default EventDetail;
