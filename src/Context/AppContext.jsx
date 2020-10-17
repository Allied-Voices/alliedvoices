import React, { Component, createContext } from 'react'
// import { getLocation } from '../utils/geolocationdb';
import { getVoices, getResources } from "../utils/airtable"
export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    lat: 39,
    lng: -98,
    locations: [],
    voices: {rows:[]},
    resources: {},
    selected: 99,
    selectedLat:39,
    selectedLng:-98,
    articleToggled:false
  }

  // Get Initial Location, Voices and Resources
  componentDidMount = async () => {
    // const { lat, lng, locations } = await getLocation()
    this.setState({
      lat: 40.730610,
      lng: -73.935242,
      locations: ['New York'],
      selectedLat:40.730610,
      selectedLng:-73.935242,
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

  selectArticle = (index) => {
    if(index!==this.state.selected){
      this.setState({
        selected:index,
        selectedLat:this.state.voices.rows[index].lat,
        selectedLng:this.state.voices.rows[index].lng,
        articleToggled:true
      })
    }
  }

  closeArticle = () => {
    this.setState({
      articleToggled:false
    })
  }

  render() {
    return (
      <AppContext.Provider value={{ 
        ...this.state,
        selectArticle:this.selectArticle,
        closeArticle:this.closeArticle
       }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;