import React, { Component } from 'react';
import './App.css';
import { Sidebar, Tab } from '../../Components/MapSideBar/MapSideBar';
import MapComponent from '../../Components/MapComponent/MapComponent';
import MapTopBar from '../../Components/MapTopBar/MapTopBar';
import { getVoices, getResources } from "../../utils/airtable"
import { getLocation } from '../../utils/geolocationdb';

class App extends Component {

  state = {
    lat: 39,
    lng: -98,
    zoom: 5,
    collapsed: true,
    selected: '',
    voices: { rows: [] },
    resources: { rows: [] },
    locations: []
  }

  onClose = () => {
    this.setState({
      collapsed: true,
      selected: ''
    });
  }

  onOpen = (id) => {
    this.setState({
      collapsed: false,
      selected: id,
    })
  }

  changeLocation = (lat, lng, zoom, locations) => {
    this.setState({
      lat,
      lng,
      zoom,
      locations
    })
  }

  refreshVoices = (voices) => {
    this.setState({
      voices
    })
  }

  refreshResources = (resources) => {
    this.setState({
      resources
    })
  }

  componentDidMount = async () => {
    const { lat, lng, locations } = await getLocation()

    this.setState({
      lat,
      lng,
      locations,
      zoom: 13
    })

    getVoices(lat, lng, (voices) => {
      this.setState({
        voices
      })
    })

    getResources(locations, (resources) => {
      this.setState({
        resources
      })
    })

  }

  render() {
    const goodDeeds = this.state.voices.rows.filter(voice => voice.Type === "Good deed")
    const incidents = this.state.voices.rows.filter(voice => voice.Type === "Race-related incident")

    return (
      <div>

        <MapTopBar
          changeLocation={this.changeLocation}
          refreshVoices={this.refreshVoices}
          refreshResources={this.refreshResources}
        >
        </MapTopBar>

        <Sidebar
          id="sidebar"
          collapsed={this.state.collapsed}
          selected={this.state.selected}
          onOpen={this.onOpen}
          onClose={this.onClose}
        >
          <Tab
            id="overview"
            header="Overview"
            icon={<img src="/assets/overview-icon.svg" alt="overview icon" />}
            lat={this.state.lat}
            lng={this.state.lng}
          />
          <Tab
            id="good-deed"
            header="Good Deeds"
            icon={<img src="/assets/gd-icon.svg" alt="overview icon" />}
            lat={this.state.lat}
            lng={this.state.lng}
            voices={goodDeeds}
          />
          <Tab
            id="incidents"
            header="Incidents"
            icon={<img src="/assets/incident-icon.svg" alt="overview icon" />}
            lat={this.state.lat}
            lng={this.state.lng}
            voices={incidents}
            allVoices={this.state.voices}
            resources={this.state.resources}
          />
          <Tab
            id="resources"
            header={this.state.locations.length ? `Resources in ${this.state.locations[0]}` : `Resources`}
            icon={<img src="/assets/resources-icon.svg" alt="overview icon" />}
            lat={this.state.lat}
            lng={this.state.lng}
            resources={this.state.resources}
          />
        </Sidebar>

        <MapComponent lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} voices={this.state.voices.rows} closeSidebar={this.onClose}></MapComponent>

      </div>
    );
  }
}

export default App;
