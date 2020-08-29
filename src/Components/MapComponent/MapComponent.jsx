import React from 'react';
import { Map, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ lat, lng, zoom, voices }) => {

  return (
    <Map className="map" center={[lat, lng]} zoom={zoom} zoomControl={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {voices.map((voice, index) => (
        <Marker position={[voice.lat, voice.lng]}>
          <Popup>
            {index} A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>)
      )}
    </Map>
  );
}

export default MapComponent;