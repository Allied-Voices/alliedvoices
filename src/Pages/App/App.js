import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import MapPage from '../MapPage/MapPage';
import AppContextProvider from '../../Context/AppContext'
import '../../Style/Global.css';

class App extends Component {
  render() {
    return (
      <AppContextProvider>
        <Switch>
          <Route exact path="/map">
            <MapPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </AppContextProvider>
    );
  }
}

export default App;
