import React, { Component } from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';
import { baseUrl } from '../../../helpers';

const initialViewPortWidth = Math.max(
  document.documentElement.clientWidth, window.innerWidth || 0
);

const columns = [
  {
  title: "Date",
  dataIndex: "date",
  key: "date",
  render: date => moment(date).format("l"),
},
{
    title: '',
    key: 'operation',
    fixed: 'right',
    width: 50,
    render: () => <Button>edit</Button>,
  },
];

class EventsTable extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });

    const that = this;
    fetch(baseUrl() + "/api/events", {
      method: 'get'
    }).then(function(response){
      return response.json();
    }).then((data) => {
      console.log(data.results);
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 200;
      this.setState({
        loading: false,
        data: data.results,
        pagination,
      });
    });
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    return (
      <Table columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.data}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default EventsTable;
