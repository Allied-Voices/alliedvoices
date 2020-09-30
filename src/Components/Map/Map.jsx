import React, { useState, useEffect, useContext } from 'react';
import { Map as LeafletMap, TileLayer, ZoomControl} from 'react-leaflet';
import MapStyles from './MapStyles.module.css'
import { AppContext } from '../../Context/AppContext'

const Map = () => {
  const [coordinates, setCoordinates] = useState({ lat: 39, lng: -98, });
  const [zoom, setZoom] = useState(5)
  const appContext = useContext(AppContext)

  useEffect(() => {
    if (coordinates.lat !== appContext.lat && coordinates.lng !== appContext.lng) {
      setCoordinates({ lat: appContext.lat, lng: appContext.lng });
      setZoom(13)
    }
  }, [coordinates.lat, coordinates.lng, appContext.lat, appContext.lng])

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