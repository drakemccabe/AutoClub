import React, { Component } from 'react';
import { baseUrl } from '../../../helpers';
import Nav from "../Nav/Nav";
import MessageBox from '../MessageBox/MessageBox';
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
    fetch(baseUrl() + "/api/events/" + that.props.params.eventId, {
      method: 'get'
    }).then(function(response){
      return response.json();
    }).then(function(res) {
      that.setState({
        events: res.results[0],
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
