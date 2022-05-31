import React, { Component, createContext } from "react";
//import { getLocation } from "../utils/geolocationdb";
import { getVoices, getResources, getAllArticles } from "../utils/airtable";
import axios from "axios";
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
    articles: { rows: [] },
    pageNum: 1,
    maxPageNum: 0,
    resources: { rows:[] },
    articleSelectedLat: 39,
    articleSelectedLng:-98,
    articleSelected: -1,
    articleToggled: false,
    articleFirstClick:false,
    articleSecondClick:false,
    filterOptions: {
      'Location Tags': [],
      'Race': [],
      'Type': [],
      'Content Type': [],
      'Incident Type': [],
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
          console.log(this.state.voices)
        });

        getResources(this.state.locations, (resources) => {
          this.setState({
            resources,
          });
          console.log(this.state.resources)});

          getAllArticles((articles) => {
            this.setState({
              articles,
            });
            console.log(this.state.articles)});
      },
    );
  };

  // Update Location and Get New Voices
  updateLocation = async (newLocation) => {
    // Use Google Geocode to convert newLocation to coordinates, and to determine the town, city, and state name if user the user did not provide it.
    let res;
    
    try {
      res = await axios({
        method: 'post',
        url: '/.netlify/functions/geocode',
        data: newLocation
      });
    } catch (e) {
      return false;
    }

    const { lat, lng, locations, locationType } = res.data;

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
          console.log('Updated after =' + this.state.resources);
        });
      }
    );

    return true;
  };

    // Update Location and Get New Voices
    refreshLocation = async (newLocation, zoom) => {
      // Use Google Geocode to convert newLocation to coordinates, and to determine the town, city, and state name if user the user did not provide it.
      let res;
      
      try {
        res = await axios({
          method: 'post',
          url: '/.netlify/functions/geocode',
          data: newLocation
        });
      } catch (e) {
        return false;
      }
      
      const { lat, lng } = res.data;
  
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

  selectArticle = (id) => {
    if (id !== this.state.articleSelected) {
      let article = this.state.voices.rows.find(voice => voice.id === id);
      this.setState({
        articleSelected: id,
        articleSelectedLat: article.lat,
        articleSelectedLng: article.lng,
        articleToggled: true,
      });
    } else {
      return false;
    }
  };
  //Responsive hooks
  firstClickArticle= (id) => {
    if (id !== this.state.articleSelected) {
      let article = this.state.voices.rows.find(voice => voice.id === id);
      this.setState({
        articleSelected: id,
        articleSelectedLat: article.lat,
        articleSelectedLng: article.lng,
        articleToggled: true,
        articleFirstClick: true,
        articleSecondClick:false,
        
      });
    } else {
      return false;
    }
  };
  secondClickArticle= () => {
     
        this.setState({
         
         
          articleSecondClick:true,
        });
      
    };
  
  
  
//=============================
  closeArticle = () => {
    this.setState({
      articleToggled:false,
      articleSelected: -1,
      articleFirstClick: false,
      articleSecondClick:false,
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
          firstClickArticle:this.firstClickArticle,
          secondClickArticle:this.secondClickArticle,
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
