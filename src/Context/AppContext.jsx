import React, { Component, createContext } from 'react'
// import { getLocation } from '../utils/geolocationdb';
import { getVoices, getResources } from "../utils/airtable"

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    lat: 39,
    lng: -98,
    locations: [],
    voices: {},
    resources: {}
  }

  // Get Initial Location, Voices and Resources
  componentDidMount = async () => {
    // const { lat, lng, locations } = await getLocation()
    this.setState({
      lat: 40.730610,
      lng: -73.935242,
      locations: ['New York'],
    }, () => {

      getVoices(this.state.lat, this.state.lng, (voices) => {
        this.setState({
          voices
        })
      })

      getResources(this.state.locations, (resources) => {
        this.setState({
          resources
        })
      })

    })
  }

  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;