import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

// Import Base CSS
import './index.css';

// Import Components
import EventList from "./components/front/EventList/EventList"
import EventShow from "./components/front/EventShow/EventShow"


const Root = () => {
  return (
    <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={EventList} />
          <Match pattern="/events/:eventId" component={EventShow} />
        </div>
    </BrowserRouter>
  )
};


render(
  <Root/>,
  document.getElementById('root')
);
