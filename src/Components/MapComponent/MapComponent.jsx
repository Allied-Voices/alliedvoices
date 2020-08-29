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
        <Marker key={`${voice.lat}-${voice.lng}`} position={[voice.lat, voice.lng]}>
          <Popup>
            <strong>{voice.Name}</strong><br />
            <strong>Type: </strong>{voice.Type}<br />
          </Popup>
        </Marker>)
      )}
    </Map>
  );
}

export default MapComponent;