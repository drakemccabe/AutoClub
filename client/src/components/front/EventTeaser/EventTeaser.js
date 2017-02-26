import React, { Component } from 'react';
import { formatDate } from "../../../helpers";

class EventTeaser extends Component {

  constructor() {
    super();
    this.rediectToEvent = this.rediectToEvent.bind(this);
  }

  rediectToEvent(event) {
    console.log(this);
    event.preventDefault();
    const eventId = this.props.details.id;
    this.context.router.transitionTo(`/events/${eventId}`);
  }

  render() {

    const { details} = this.props;

    return (
      <li>
        <h2>{details.name}</h2>
        <p>{details.location}</p>
        <p>{formatDate(details.date)}</p>
        <a onClick={this.rediectToEvent} href="#">Go To Event</a>
      </li>
    );
  }
}

EventTeaser.contextTypes = {
  router: React.PropTypes.object
}

export default EventTeaser;
