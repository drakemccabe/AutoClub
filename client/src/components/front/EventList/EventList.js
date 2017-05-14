import React, { Component } from 'react';
import './EventList.css';
import { baseUrl } from '../../../helpers';
import EventTeaser from '../EventTeaser/EventTeaser';
import FrontCta from '../FrontCta/FrontCta';
import MessageBox from '../MessageBox/MessageBox';
import RunGroup from '../RunGroup/RunGroup';
import Nav from "../Nav/Nav";

class EventList extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      message: '',
      error: false
    };
  }

  componentDidMount() {
    const that = this;
    fetch(baseUrl() + "/api/events", {
      method: 'get'
    }).then(function(response){
      return response.json();
    }).then(function(res) {
      that.setState({
        events: res.results,
        error: res.status.code != 200,
        message: res.status.message
      })
    })
  }

  render() {
    return (
      <div>
          <MessageBox message={this.state.message} error={this.state.error} />
          <Nav />
        <div className="event-list__cta">
          <FrontCta />
        </div>
        <div className="event-list__container">
          <ul className="list pl0">
            {
              this.state.events.map(function(event) {
                  return <EventTeaser key={event.id} details={event} />
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default EventList;
