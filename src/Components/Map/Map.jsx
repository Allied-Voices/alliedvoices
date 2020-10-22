import React, { useState, useEffect, useContext } from 'react';
import { Map as LeafletMap, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import MapStyles from './MapStyles.module.css'
import { AppContext } from '../../Context/AppContext'

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

const Map = () => {
  const [coordinates, setCoordinates] = useState({ lat: 39, lng: -98, });
  const [zoom, setZoom] = useState(5)
  const appContext = useContext(AppContext)
  const mapRef = React.createRef();

  useEffect(() => {
    window.test = mapRef.current.leafletElement;
    setTimeout(()=>{window.test.invalidateSize()}, 450)
    if (coordinates.lat !== appContext.selectedLat && coordinates.lng !== appContext.selectedLng) {
      setCoordinates({ lat: appContext.selectedLat, lng: appContext.selectedLng });
      setZoom(13);
    }
  }, [coordinates.lat, coordinates.lng, appContext.selectedLat, appContext.selectedLng, mapRef])

  // useEffect(()=>{
  //   console.log(mapRef.current.leafletElement.invalidateSize())
  // })

  return (
    <LeafletMap ref={mapRef} className={MapStyles.Map} center={[coordinates.lat, coordinates.lng]} zoom={zoom} zoomControl={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {appContext.voices.rows && appContext.voices.rows.map((voice, index) => (
        <Marker key={`${index}-${voice.lat}-${voice.lng}`} position={[voice.lat, voice.lng]} icon={voice.Type === 'Good deed' ? gdMarker : incidentMarker}>
          <Popup>
            <strong>{voice.Name}</strong><br />
            <strong>Type: </strong>{voice.Type}<br />
          </Popup>
        </Marker>)
      )}
    </LeafletMap>
  );
}

export default Map;