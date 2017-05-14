import React, { Component } from 'react';
import { formatDate } from "../../../helpers";
import "./EventTeaser.css";

class EventTeaser extends Component {

  constructor() {
    super();
    this.rediectToEvent = this.rediectToEvent.bind(this);
  }

  rediectToEvent(event) {
    event.preventDefault();
    const eventId = this.props.details._id;
    this.context.router.transitionTo(`/events/${eventId}`);
  }

  render() {

    const { details} = this.props;

    return (
      <li className="pa3 pa4-ns bb b--black-10">
        <a onClick={this.rediectToEvent} href="#">
          <b className="db f3 mb1">{details.name}</b>
          <span className="f5 db lh-copy measure">{formatDate(details.date)}</span>
        </a>
      </li>
    );
  }
}

EventTeaser.contextTypes = {
  router: React.PropTypes.object
}

export default EventTeaser;
