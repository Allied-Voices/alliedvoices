import React, { Component, createContext } from "react";
import { getLocation } from "../utils/geolocationdb";
import { getVoices, getResources } from "../utils/airtable";
import { getGeocodeInformationFor } from "../utils/geocoder";
export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    lat: 39,
    lng: -98,
    locations: [],
    voices: { rows: [] },
    resources: {},
    selected: 99,
    selectedLat: 39,
    selectedLng: -98,
    articleToggled: false,
    filterOptions: {
      'Location Tags': [],
      'Race': [],
      'Type': [],
      'Content Type': [],
      'Incident type': [],
      'Search': []
    }
  }

  // Get Initial Location, Voices and Resources
  componentDidMount = async () => {
    const { lat, lng, locations } = await getLocation();
    this.setState(
      {
        lat: lat,
        lng: lng,
        locations: locations,
        selectedLat: lat,
        selectedLng: lng,
      },
      () => {
        getVoices(this.state.lat, this.state.lng, (voices) => {
          this.setState({
            voices,
          });
        });

        // getVoices(40.73, -73.93, (voices) => {
        //   this.setState({
        //     voices
        //   })
        // });

        getResources(this.state.locations, (resources) => {
          this.setState({
            resources,
          });
        });
      }
    );
  };

  // Update Location and Get New Voices
  updateLocation = async (newLocation) => {
    // Use Google Geocode to convert newLocation to coordinates, and to determine the town, city, and state name if user the user did not provide it.
    const { lat, lng, locations } = await getGeocodeInformationFor(newLocation);

    // Return if the newLocation is not recognized by a geocoder
    if (!lat || !lng || !locations) {
      return false;
    }

    // Update State and then make calls to get new voices and resources
    this.setState(
      {
        lat: lat,
        lng: lng,
        locations: locations,
        selectedLat: lat,
        selectedLng: lng,
      },
      () => {
        getVoices(
          this.state.lat,
          this.state.lng,
          this.state.filterOptions,
          (voices) => {
            this.setState({
              voices,
            });
          }
        );

        getResources(this.state.locations, (resources) => {
          this.setState({
            resources,
          });
        });
      }
    );
  };

  selectArticle = (index) => {
    if (index !== this.state.selected) {
      this.setState({
        selected: index,
        selectedLat: this.state.voices.rows[index].lat,
        selectedLng: this.state.voices.rows[index].lng,
        articleToggled: true,
      });
    }
  };

  closeArticle = () => {
    this.setState({
      articleToggled:false
    });
  }

  filterVoices = (filterKey, filterOptions) => {
    this.setState(
      {
        filterOptions: {
          ...this.state.filterOptions,
          [filterKey]: filterOptions,
        },
      },
      () => {
        getVoices(
          this.state.lat,
          this.state.lng,
          this.state.filterOptions,
          (voices) => {
            this.setState({
              voices,
            });
          }
        );
      }
    );
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          updateLocation: this.updateLocation,
          filterVoices: this.filterVoices,
          selectArticle: this.selectArticle,
          closeArticle: this.closeArticle,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
