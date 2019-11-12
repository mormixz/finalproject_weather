import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import './App.css';
import { Header } from 'semantic-ui-react';


import Main from './components/main';
import Detail from './components/detail'
import Add from './components/add';

const App = () => {
  return (
    <div className="App">
      <Router>
        <HeaderPresentation/>

        <Route exact path="/" component={ Main }/>
        <Route exact path="/add" component={ Add }/>
        <Route exact path="/detail/:id" component={ Detail }/>
        {/* <Redirect to="/" /> */}
      </Router>
    </div>
  );
}

export default App;

const HeaderPresentation = () => (
  <h2 className="ui dividing header">
      <div className="header-block">
          <Header className="header-style" as='h1'>
              <Link 
                  to="/" 
                  className="margin-left30px pointer"
                  style={{ color:'black'}}
              >
                  Weather
              </Link>
          </Header>
      </div>
  </h2>
)
