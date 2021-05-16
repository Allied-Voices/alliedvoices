import React, { Component, createContext } from "react";
import { getLocation } from "../utils/geolocationdb";
import { getVoices, getResources } from "../utils/airtable";
import { getGeocodeInformationFor } from "../utils/geocoder";
import determineLocationZoom from '../utils/locationTypes'
export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    orgLat: 39,
    orgLng: -98,
    zoom: 1, 
    locations: [],
    locationType: '',
    voices: { rows: [] },
    pageNum: 1,
    maxPageNum: 0,
    resources: {},
    articleSelectedLat: 39,
    articleSelectedLng:-98,
    articleSelected: -1,
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
    // For getting user's current location. Disabled for now.
    // const { lat, lng, locations, locationType } = await getLocation();

    let zoom = 13;

    this.setState(
      {
        orgLat: 40.7127753,
        orgLng: -74.0059728,
        zoom: zoom,
        locations: ["New York", "New York"],
        locationType: "locality"
      },
      () => {
        getVoices(this.state.orgLat, this.state.orgLng, this.state.pageNum, (voices, maxPageNum) => {
          this.setState({
            voices,
            maxPageNum
          });
        });

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

    let zoom = determineLocationZoom(locationType);

    // Update State and then make calls to get new voices and resources
    this.setState(
      {
        orgLat: lat,
        orgLng: lng,
        locations: locations,
        locationType: locationType,
        zoom: zoom,
        pageNum: 1,
        articleToggled: false
      },
      () => {
        getVoices(
          this.state.orgLat,
          this.state.orgLng,
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

    // Update Location and Get New Voices
    refreshLocation = async (newLocation, zoom) => {
      // Use Google Geocode to convert newLocation to coordinates, and to determine the town, city, and state name if user the user did not provide it.
      const { lat, lng } = await getGeocodeInformationFor(newLocation);
  
      // Return if the newLocation is not recognized by a geocoder
      if (!lat || !lng ) {
        return false;
      }
  
      // Update State and then make calls to get new voices and resources
      this.setState(
        {
          orgLat: lat,
          orgLng: lng,
          pageNum: 1,
          zoom: zoom,
        },
        () => {
          getVoices(
            this.state.orgLat,
            this.state.orgLng,
            this.state.pageNum,
            this.state.filterOptions,
            (voices, maxPageNum) => {
              if(maxPageNum){
                this.setState({
                  voices,
                  maxPageNum,
                  articleSelected: 0,
                });
              }else{
                this.setState({
                  voices,
                  maxPageNum,
                  articleSelected: -1,
                  articleToggled: false,
                });
              }
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
    if (index !== this.state.articleSelected) {
      this.setState({
        articleSelected: index,
        articleSelectedLat: this.state.voices.rows[index].lat,
        articleSelectedLng: this.state.voices.rows[index].lng,
        articleToggled: true,
      });
    } else {
      return false;
    }
  };

  closeArticle = () => {
    this.setState({
      articleToggled:false,
      articleSelected: -1
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
          this.state.orgLat,
          this.state.orgLng,
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
          this.state.orgLat,
          this.state.orgLng,
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
          this.state.orgLat,
          this.state.orgLng,
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
          this.state.orgLat,
          this.state.orgLng,
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
          refreshLocation: this.refreshLocation,
          filterVoices: this.filterVoices,
          selectArticle: this.selectArticle,
          closeArticle: this.closeArticle,
          selectPage: this.selectPage,
          goToPrevPage: this.goToPrevPage,
          goToNextPage: this.goToNextPage,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
