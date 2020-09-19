import React, { Component, createContext } from 'react'
import { getLocation } from '../utils/geolocationdb';

export const LocationContext = createContext();

class LocationContextProvider extends Component {
  state = {
    lat: 39,
    lng: -98,
    locations: []
  }

  // Get Initial Location
  componentDidMount = async () => {
    const { lat, lng, locations } = await getLocation()
    this.setState({
      lat,
      lng,
      locations,
    })
  }

  render() {
    return (
      <LocationContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </LocationContext.Provider>
    );
  }
}

export default LocationContextProvider;