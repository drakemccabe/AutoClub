import React, { Component } from 'react';
import './EventList.css';
import { baseUrl } from '../../../helpers';
import EventTeaser from '../EventTeaser/EventTeaser';

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
        <div className="error" style={{ display: this.state.error ? 'block': 'none'}}>
          <h2>{this.state.message}</h2>
        </div>
        <div>
          <ul>
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
