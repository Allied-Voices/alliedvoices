import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import MapPage from '../MapPage/MapPage'
import LocationContextProvider from '../../Context/LocationContext'
import './App.css';

class App extends Component {
  render() {
    return (
      <LocationContextProvider>
        <Switch>
          <Route exact path="/">
            <MapPage />
          </Route>
          <Route path="/landing">
            <LandingPage />
          </Route>
        </Switch>
      </LocationContextProvider>
    );
  }
}

export default App;
