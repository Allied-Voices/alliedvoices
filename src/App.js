import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage2 from './Pages/LandingPage/LandingPage2';
import MapPage from './Pages/MapPage/MapPage';
import AppContextProvider from './Context/AppContext';
import './Style/Global.css';

class App extends Component {
  render() {
    return (
      <AppContextProvider>
        <Switch>
          <Route exact path='/map'>
            <MapPage />
          </Route>
          <Route path='/'>
            <LandingPage2 />
          </Route>
        </Switch>
      </AppContextProvider>
    );
  }
}

export default App;
