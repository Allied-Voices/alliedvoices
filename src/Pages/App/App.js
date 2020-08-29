import React, { Component } from 'react';
import './App.css';
import { Sidebar, Tab } from '../../Components/MapSideBar/MapSideBar';
import MapComponent from '../../Components/MapComponent/MapComponent';
import MapTopBar from '../../Components/MapTopBar/MapTopBar';

class App extends Component {

  state = {
    lat: 39,
    lng: -98,
    zoom: 5,
    collapsed: true,
    selected: '',
    voices: [{ lat: 37, lng: -98 }]
  }

  onClose() {
    this.setState({
      collapsed: true,
      selected: ''
    });
  }
  onOpen(id) {
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

  // refreshvoices = (newvoices) => {
  //   let voices = newvoices;
  //   this.setState({
  //     voices
  //   })
  // }

  render() {
    return (
      <div>
        <MapTopBar changeLocation={this.changeLocation}></MapTopBar>
        <Sidebar
          id="sidebar"
          collapsed={this.state.collapsed}
          selected={this.state.selected}
          onOpen={this.onOpen.bind(this)}
          onClose={this.onClose.bind(this)}
        >
          <Tab id="home" header="Home" icon="fa fa-home" >
            <p>No place like home!</p>
          </Tab>
          <Tab id="report" header="Report" icon="fa fa-plus-square" >
            <p>Report dialogue.</p>
          </Tab>
          <Tab id="Question" header="Questions" icon="fa fa-question fa-stack" >
            <p>Settings dialogue.</p>
          </Tab>
          <Tab id="settings" header="Settings" icon="fa fa-cog" >
            <p>Settings dialogue.</p>
          </Tab>
        </Sidebar>
        <MapComponent lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} voices={this.state.voices} ></MapComponent>
      </div>
    );
  }
}

export default App;
