import React, { Component } from 'react';
import Calendar from "./Calendar";
import Options from "./Options";
import { Steps, Button, message, Icon } from 'antd';
const Step = Steps.Step;

const steps = [{
  content: 'When will this event be held?',
  icon: "schedule",
  component: Calendar
}, {
  content: 'What are the details?',
  icon: "tool",
  component: Options
}, {
  content: 'Review the event before publishing',
  icon: "eye",
  component: Options
}];

class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    const CurrentStepContent = steps[this.state.current].component;

    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} icon={<Icon type={item.icon} />} />)}
        </Steps>
        <div className="steps-content">
          <div style={{ padding: 20, textAlign: "center" }}>
            {steps[this.state.current].content}
          </div>
          <div style={{ paddingTop: 20 }}>
            <CurrentStepContent />
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 20 }} className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button style={{ marginLeft: 'auto' }} type="primary" onClick={() => this.next()}>Continue</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button style={{ marginLeft: 'auto' }} type="primary" onClick={() => message.success('Event Created')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Go Back
            </Button>
          }
        </div>
      </div>
    );
  }
}


export default NewEvent;
