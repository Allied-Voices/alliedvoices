import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import { Sidebar, Tab } from './Sidebar';

class App extends Component {

  state = {
    lat: 39,
    lng: -98,
    zoom: 5,
    collapsed: true,
    selected: '',
  }

  handleClick = () => {
    this.setState({
      zoom: this.state.zoom + 1
    })
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

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <Sidebar id="sidebar" collapsed={this.state.collapsed} selected={this.state.selected}
          onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
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
        <Map className="map" center={position} zoom={this.state.zoom} zoomControl={false}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />

        </Map>
      </div>
    );
  }
}

export default App;
