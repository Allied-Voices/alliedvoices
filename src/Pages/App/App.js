import React, { Component } from 'react';
import './App.css';
import { Sidebar, Tab } from '../../Components/MapSideBar/MapSideBar';
import MapComponent from '../../Components/MapComponent/MapComponent';
import MapTopBar from '../../Components/MapTopBar/MapTopBar';
import { getVoices } from "../../utils/airtable"
import { getLocation } from '../../utils/geolocationdb';

class App extends Component {

  state = {
    lat: 39,
    lng: -98,
    zoom: 5,
    collapsed: true,
    selected: '',
    voices: []
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

  changeLocation = (lat, lng, zoom) => {
    this.setState({
      lat: lat,
      lng: lng,
      zoom: zoom
    })
  }

  refreshVoices = (newVoices) => {
    let voices = [...newVoices];
    this.setState({
      voices
    })
  }

  componentDidMount = async () => {
    const { lat, lng } = await getLocation()
    const voices = await getVoices(lat, lng)

    this.setState({
      lat,
      lng,
      zoom: 13,
      voices
    })
  }

  render() {
    const goodDeeds = this.state.voices.filter(voice => voice.Type === "Good deed")
    const incidents = this.state.voices.filter(voice => voice.Type === "Race-related incident")

    return (
      <div>
        <MapTopBar changeLocation={this.changeLocation} refreshVoices={this.refreshVoices}></MapTopBar>
        <Sidebar
          id="sidebar"
          collapsed={this.state.collapsed}
          selected={this.state.selected}
          onOpen={this.onOpen}
          onClose={this.onClose}
        >
          <Tab id="overview" header="Overview" icon={<img src="/assets/overview-icon.svg" alt="overview icon" />} lat={this.state.lat} lng={this.state.lng} >
            <div><p>No place like home!</p></div>
          </Tab>
          <Tab id="good-deed" header="Good Deeds" icon={<img src="/assets/gd-icon.svg" alt="overview icon" />} lat={this.state.lat} lng={this.state.lng} >
            {goodDeeds}
          </Tab>
          <Tab id="incidents" header="Incidents" icon={<img src="/assets/incident-icon.svg" alt="overview icon" />} lat={this.state.lat} lng={this.state.lng} >
            {incidents}
          </Tab>
          <Tab id="resources" header="Resources" icon={<img src="/assets/resources-icon.svg" alt="overview icon" />} lat={this.state.lat} lng={this.state.lng} >
            <p>Settings dialogue.</p>
          </Tab>
        </Sidebar>
        <MapComponent lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} voices={this.state.voices} closeSidebar={this.onClose}></MapComponent>
      </div>
    );
  }
}

export default App;
