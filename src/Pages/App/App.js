import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import MapPage from '../MapPage/MapPage'
import NewMapPage from '../NewMapPage/NewMapPage';
import AppContextProvider from '../../Context/AppContext'
import '../../Style/Global.css';

class App extends Component {
  render() {
    return (
      <AppContextProvider>
        <Switch>
          <Route exact path="/">
            <MapPage />
          </Route>
          <Route path="/landing">
            <LandingPage />
          </Route>
          <Route path="/new">
            <NewMapPage />
          </Route>
        </Switch>
      </AppContextProvider>
    );
  }
}

export default App;
