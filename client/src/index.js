import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

// Import Base CSS
import './index.css';

// Import Components
import EventList from "./components/front/EventList/EventList";
import EventShow from "./components/front/EventShow/EventShow";
import Footer from "./components/front/Footer/Footer";
import CheckList from "./components/front/CheckList/CheckList";
import FAQHome from "./components/front/FAQ/FAQHome";
import RunGroup from "./components/front/RunGroup/RunGroup";
import Nav from "./components/front/Nav/Nav";
import NotFound from "./components/front/NotFound/NotFound";
import Login from "./components/front/Login/Login";
import Contact from "./components/front/Contact/Contact";
import RuleBook from "./components/front/RuleBook/RuleBook";
import BackEndContainer from "./components/back/BackEndContainer/BackEndContainer";

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const Root = () => {
  return (
    <div>
      <div className="main">
        <LocaleProvider locale={enUS}>
          <BrowserRouter>
              <div>
                <Match exactly pattern="/" component={EventList} />
                <Match pattern="/events/:eventId" component={EventShow} />
                <Match pattern="/check-list" component={CheckList} />
                <Match pattern="/faqs" component={FAQHome} />
                <Match pattern="/run-group" component={RunGroup} />
                <Match pattern="/login" component={Login} />
                <Match pattern="/contact" component={Contact} />
                <Match pattern="/rule-book" component={RuleBook} />
                <Match pattern="/backend" component={BackEndContainer} />
                <Miss component={NotFound} />
              </div>
          </BrowserRouter>
        </LocaleProvider>
      </div>
      <Footer />
    </div>
  )
};


render(
  <Root/>,
  document.getElementById('root')
);
