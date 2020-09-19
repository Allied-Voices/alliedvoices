import React from 'react';
import { Map, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import MapComponentStyles from './MapComponentStyles.module.css'

const gdMarker = new L.Icon({
  iconUrl: '/assets/gd-marker.svg',
  iconRetinaUrl: '/assets/gd-marker.svg',
  iconSize: [25, 25],
  iconAnchor: [13, 25],
  popupAnchor: [0, -25],
})

const incidentMarker = new L.Icon({
  iconUrl: '/assets/incident-marker.svg',
  iconRetinaUrl: '/assets/incident-marker.svg',
  iconSize: [25, 23],
  iconAnchor: [13, 23],
  popupAnchor: [0, -23],
})

const MapComponent = ({ lat, lng, zoom, voices, closeSidebar }) => {

  return (
    <Map className={MapComponentStyles.Map} center={[lat, lng]} zoom={zoom} zoomControl={false} onClick={closeSidebar}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {voices.map((voice, index) => (
        <Marker key={`${index}-${voice.lat}-${voice.lng}`} position={[voice.lat, voice.lng]} icon={voice.Type === 'Good deed' ? gdMarker : incidentMarker}>
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