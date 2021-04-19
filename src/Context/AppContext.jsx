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
    locationType: '',
    voices: { rows: [] },
    pageNum: 1,
    maxPageNum: 0,
    resources: {},
    selected: -1,
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
    const { lat, lng, locations, locationType } = await getLocation();
    this.setState(
      {
        lat: lat,
        lng: lng,
        locations: locations,
        locationType: locationType,
        selectedLat: lat,
        selectedLng: lng,
      },
      () => {
        getVoices(this.state.lat, this.state.lng, this.state.pageNum, (voices, maxPageNum) => {
          this.setState({
            voices,
            maxPageNum
          });
        });

        // getVoices(40.73, -73.93, this.state.pageNum, (voices,  maxPageNum) => {
        //   this.setState({
        //     voices,
        //     maxPageNum
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
    const { lat, lng, locations, locationType } = await getGeocodeInformationFor(newLocation);

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
        locationType: locationType,
        selectedLat: lat,
        selectedLng: lng,
        pageNum: 1,
        articleToggled: false
      },
      () => {
        getVoices(
          this.state.lat,
          this.state.lng,
          this.state.pageNum,
          this.state.filterOptions,
          (voices, maxPageNum) => {
            this.setState({
              voices,
              maxPageNum
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

    return true;
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
      articleToggled:false,
      selected: -1
    });
  }

  filterVoices = (filterKey, filterOptions) => {
    this.setState(
      {
        filterOptions: {
          ...this.state.filterOptions,
          [filterKey]: filterOptions,
        },
        pageNum: 1
      },
      () => {
        getVoices(
          this.state.lat,
          this.state.lng,
          this.state.pageNum,
          this.state.filterOptions,
          (voices, maxPageNum) => {
            this.setState({
              voices,
              maxPageNum
            });
          }
        );
      }
    );
  };

  selectPage = (pageNum) => {
    this.setState(
      {
        pageNum
      },
      () => {
        getVoices(
          this.state.lat,
          this.state.lng,
          this.state.pageNum,
          this.state.filterOptions,
          (voices, maxPageNum) => {
            this.setState({
              voices,
              maxPageNum
            });
          }
        );
      }
    );
  };

  goToPrevPage = () => {
    if(this.state.pageNum === 1) return;
    this.setState(
      {
        pageNum: this.state.pageNum-1
      },
      () => {
        getVoices(
          this.state.lat,
          this.state.lng,
          this.state.pageNum,
          this.state.filterOptions,
          (voices, maxPageNum) => {
            this.setState({
              voices,
              maxPageNum
            });
          }
        );
      }
    )
  };

  goToNextPage = () => {
    if(this.state.pageNum === this.state.maxPageNum) return;
    this.setState(
      {
        pageNum: this.state.pageNum+1
      },
      () => {
        getVoices(
          this.state.lat,
          this.state.lng,
          this.state.pageNum,
          this.state.filterOptions,
          (voices, maxPageNum) => {
            this.setState({
              voices,
              maxPageNum
            });
          }
        );
      }
    )
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          updateLocation: this.updateLocation,
          filterVoices: this.filterVoices,
          selectArticle: this.selectArticle,
          closeArticle: this.closeArticle,
          selectPage: this.selectPage,
          goToPrevPage: this.goToPrevPage,
          goToNextPage: this.goToNextPage
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
