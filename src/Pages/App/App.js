import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import MapPage from '../MapPage/MapPage'
import LocationContextProvider from '../../Context/LocationContext'
import './App.css';

class App extends Component {

  state = {
  }


  render() {
    return (
      <LocationContextProvider>
        <Switch>
          <Route exact path="/map">
            <MapPage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </LocationContextProvider>
    );
  }
}

export default App;
