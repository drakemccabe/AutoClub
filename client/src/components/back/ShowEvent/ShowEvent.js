import React, { Component } from 'react';
import { Icon, Progress, Badge,  Popconfirm, message, Button, Switch, Select, Row, Col, Card, Timeline, Table } from 'antd';
import moment from 'moment';
import { baseUrl } from '../../../helpers';

var events = [];

function handleNewNote() {
  console.log('note');

}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date Added",
    dataIndex: "createdAt",
    key: "createdAt",
    render: date => moment(date).format("l")
  },
  {
    title: "Added By",
    dataIndex: "addedBy",
    key: "addedBy"
  },
  {
    title: "Paid",
    dataIndex: "pricePaid",
    key: "pricePaid"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Car",
    dataIndex: "car",
    key: "car"
  },
  {
    title: "Payment Ref",
    dataIndex: "paymentRef",
    key: "paymentRef"
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
    render: notes =>  <Badge dot={ notes.length > 0 }><Icon onClick={handleNewNote} type={ notes.length > 1 ? "notification" : "edit"} /></Badge>
  },
  {
    title: 'Move to Event',
    key: "operation",
    fixed: 'right',
    width: 75,
    render: function(row) {
      return(
        <Select defaultValue="Select Event" style={{ width: 120 }} >
          {
            events.map(function(event) {
              return <Select.Option value={event._id}>{moment(event.date).format("l")}</Select.Option>
            })
          }
        </Select>
      );
    }
  }
]

class ShowEvent extends Component {

  constructor() {
    super();
    this.state = {
      event: { changeLog: [], drivers: []  },
      message: '',
      error: false,
      loading: true
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
        event: res.results[0],
        error: res.status.code != 200,
        message: res.status.message,
        drivers: res.results[0].drivers,
        loading: false
      })

      fetch(baseUrl() + "/api/events", {
        method: 'get'
      }).then(function(response2){
        return response2.json();
      }).then(function(res2) {
         events = res2.results;
         that.setState({
           events: res2.results
        })
      })

    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
            <div>
              <p>{this.state.event.name}</p>
              <p>Location: {this.state.event.location}</p>
              <p>Price: {this.state.event.price}</p>
              <p>Date: {this.state.event.date}</p>
                <p><Button type="primary" icon="download">Download</Button></p>
            </div>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <p>Created At: {this.state.event.createdAt}</p>
                <p>Driver Limit: {this.state.event.driverLimit}</p>
                <p>Drivers Registered: {this.state.event.drivers.length}</p>
                <p>Created By: {this.state.event.createdBy}</p>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                Allow Registration?
              </Col>
              <Col span={12}>
                <Switch defaultChecked={!this.state.event.regIsOpen} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                Show on Schedule?
              </Col>
              <Col span={12}>
                <Switch defaultChecked={!this.state.event.signUpIsVisible} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Popconfirm title="Are you sure delete this task?" onConfirm={ () => ''} onCancel={ () => ''} okText="Yes" cancelText="No">
                  <Button type="danger">Delete Event</Button>
                </Popconfirm>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <img style={{ maxWidth: "100%" }} src={this.state.event.image} />
          </Col>
          <Col span={4}>
            <Progress
              type="circle"
              percent={this.state.event.drivers.length / this.state.event.driverLimit * 100}
              format={ () => this.state.event.drivers.length } />
          </Col>
        </Row>
        <Row>
          <Col span={24}>

             <Table columns={columns}
              size="middle"
              rowKey={record => record._id}
              pagination={false}
              title={() => 'Registered Drivers'}
              expandedRowRender={record => <p>{record.notes.join(", ")}</p>}
              dataSource={this.state.event.drivers}
            />

          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Timeline>
              {
                this.state.event.changeLog.map(function(change) {
                  return <Timeline.Item> {change.message} {change.time} </Timeline.Item>
                })
              }
            </Timeline>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ShowEvent;
