import React, { Component } from 'react';
import "./Nav.css";
import menu from 'react-burger-menu';
const Menu = menu.slide

class Nav extends Component {

  constructor() {
    super();
    this.redirectToEvents = this.redirectToEvents.bind(this);
    this.redirectToRunGroup = this.redirectToRunGroup.bind(this);
    this.redirectToRuleBook = this.redirectToRuleBook.bind(this);
    this.redirectToContact = this.redirectToContact.bind(this);
    this.redirectToFAQ = this.redirectToFAQ.bind(this);
    this.redirectToCheckList = this.redirectToCheckList.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToEvents(event) {
    event.preventDefault();
    this.context.router.transitionTo('/');
  }

  redirectToRunGroup(event) {
    event.preventDefault();
    this.context.router.transitionTo('/run-group');
  }

  redirectToRuleBook(event) {
    event.preventDefault();
    this.context.router.transitionTo('/rule-book');
  }

  redirectToFAQ(event) {
    event.preventDefault();
    this.context.router.transitionTo('/faqs');
  }

  redirectToCheckList(event) {
    event.preventDefault();
    this.context.router.transitionTo('/check-list');
  }

  redirectToLogin(event) {
    event.preventDefault();
    this.context.router.transitionTo('/login');
  }

  redirectToContact(event) {
    event.preventDefault();
    this.context.router.transitionTo('/contact');
  }

  render() {

    const that = this;

    return (
      <div className="nav">
        <Menu>
          <a id="EventListNav" onClick={that.redirectToEvents} className="menu-item" href="/">Event Schedule</a>
          <a id="RunGroupNav" onClick={that.redirectToRunGroup} className="menu-item" href="/run-group">Run Group Schedule</a>
          <a id="RullebookNav" onClick={that.redirectToRuleBook} className="menu-item" href="/rule-book">Rulebook</a>
          <a id="FAQNav" onClick={that.redirectToFAQ} className="menu-item" href="/faqs">FAQs</a>
          <a id="ChecListNav" onClick={that.redirectToCheckList} className="menu-item" href="/check-list">Tech CheckList</a>
          <a id="login" onClick={that.redirectToLogin} className="menu-item" href="/login">Login</a>
          <a id="contact" onClick={that.redirectToContact} className="menu-item" href="/contact">Contact Us</a>
        </Menu>
      </div>
    );

  }
}

Nav.contextTypes = {
  router: React.PropTypes.object
}

export default Nav;
