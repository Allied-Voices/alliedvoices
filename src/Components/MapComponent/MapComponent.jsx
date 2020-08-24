import React from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';

const MapComponent = ({ lat, lng, zoom }) => {


  return (
    <Map className="map" center={[lat, lng]} zoom={zoom} zoomControl={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
    </Map>
  );
}

export default MapComponent;