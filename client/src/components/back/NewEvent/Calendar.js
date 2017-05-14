import React, { Component } from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';
import 'moment/locale/en-gb';


class EventCalendar extends React.Component {
  state = {
    value: moment(),
    selectedValue: moment(),
  }
  onSelect = (value) => {
    this.setState({
      value,
      selectedValue: value,
    });
  }
  onPanelChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { value, selectedValue } = this.state;
    value.locale('en');
    return (
      <div>
        <div style={{ display: 'table', margin: '0 auto', maxWidth: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
          <Calendar value={value} onSelect={this.onSelect} fullscreen={false} onPanelChange={this.onPanelChange} />
        </div>
        <Alert
          style={{ display: 'table', margin: '0 auto', maxWidth: 290, marginTop: 20 }}
          message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
        />
      </div>
    );
  }
}

export default EventCalendar;
