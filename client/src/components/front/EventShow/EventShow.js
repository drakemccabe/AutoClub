import React, { Component } from 'react';
import { baseUrl } from '../../../helpers';
import EventDetail from '../EventDetail/EventDetail';
import EventBundle from '../EventBundle/EventBundle';

class EventShow extends Component {

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
    fetch(baseUrl() + "/fetch/events/22", {
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
                return <EventDetail key={new Date} details={event} />
              })
            }
          </ul>
        </div>
        <div className="details">
          <EventBundle details={this.state.event} />
        </div>
      </div>
    );
  }
}

export default EventShow;
