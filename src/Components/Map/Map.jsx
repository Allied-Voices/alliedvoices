import React, { useState } from 'react';
import { Map as LeafletMap, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import MapStyles from './MapStyles.module.css'

const Map = () => {
  const [coordinates, setCoordinates] = useState({ lat: 39, lng: -98, });
  const [zoom, setZoom] = useState(5)


  return (
    <LeafletMap className={MapStyles.Map} center={[coordinates.lat, coordinates.lng]} zoom={zoom} zoomControl={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
    </LeafletMap>
  );
}

export default Map;