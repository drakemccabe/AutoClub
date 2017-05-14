import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import "./BackEndContainer.css";
import NewEvent from "../NewEvent/NewEvent";
import ListEvents from "../ListEvents/ListEvents";
import ShowEvent from "../ShowEvent/ShowEvent";
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class BackEndContainer extends React.Component {

  initialViewPortWidth = Math.max(
    document.documentElement.clientWidth, window.innerWidth || 0
  );

  state = {
    collapsed: this.initialViewPortWidth < 1000,
    mode: 'inline',
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  render() {
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">&nbsp;</div>
          <Menu theme="light" mode={this.state.mode} defaultSelectedKeys={['']}>
          <Menu.Item key="1">
            <span>
              <Icon type="calendar" />
              <span className="nav-text">Events</span>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>
              <Icon type="plus-circle-o" />
              <span className="nav-text">New Event</span>
            </span>
          </Menu.Item>
          <Menu.Item key="3">
            <span>
              <Icon type="car" />
              <span className="nav-text">Drivers</span>
            </span>
          </Menu.Item>
          </Menu>
        </Sider>
        <Layout>

          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>


              <ShowEvent />

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>

          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BackEndContainer;
