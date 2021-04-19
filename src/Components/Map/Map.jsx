import React, { useState, useEffect, useContext, useRef } from 'react';
import useDebounce from '../../CustomHooks/use-debounce'
import { Map as LeafletMap, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import MapStyles from './MapStyles.module.css'
import { AppContext } from '../../Context/AppContext'
import determineLocationZoom from '../../utils/locationTypes'

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
  const [newCoordinates, setNewCoordinates] = useState({lat: null, lng:null});
  const [didClick, setDidClick] = useState(false);
  const appContext = useContext(AppContext)
  const mapRef = useRef();
  const zoom = useRef(13);

  useEffect(() => {
    window.leafletElement = mapRef.current.leafletElement;
    setTimeout(()=>{window.leafletElement.invalidateSize()}, 450);
    if (coordinates.lat !== appContext.selectedLat && coordinates.lng !== appContext.selectedLng) {
      setCoordinates({ lat: appContext.selectedLat, lng: appContext.selectedLng });
      zoom.current = determineLocationZoom(appContext.locationType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates.lat, coordinates.lng, appContext.selectedLat, appContext.selectedLng, mapRef]);

  const debouncedNewCoordinates = useDebounce(newCoordinates, 2000);

  useEffect(()=>{
    if(newCoordinates.lat !== null && newCoordinates.lng !== null && (Math.abs(newCoordinates.lat - coordinates.lat) > 0.25 || Math.abs(newCoordinates.lng - coordinates.lng) > 0.25)){
      appContext.updateLocation({lat:newCoordinates.lat, lng:newCoordinates.lng});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNewCoordinates])

  const handleMoveEnd = (e) => {
    if(mapRef.current && didClick){
      let latlng = mapRef.current.leafletElement.getCenter();
      setNewCoordinates({lat:latlng.lat, lng:latlng.lng});
      setDidClick(false);
    }
  }

  const handleZoom = (e) => {
    zoom.current = e.sourceTarget._zoom;
  }

  const handleMouseDown = (e) => {
    setDidClick(true);
  }

  return (
    <LeafletMap ref={mapRef} className={MapStyles.Map} center={[coordinates.lat, coordinates.lng]} zoom={zoom.current} zoomControl={false} onmousedown={handleMouseDown} onmoveend={handleMoveEnd} onzoomend={handleZoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
      {appContext.voices.rows && appContext.voices.rows.map((voice, index) => (
        <Marker onclick={() => appContext.selectArticle(index)} key={`${index}-${voice.lat}-${voice.lng}`} position={[voice.lat, voice.lng]} icon={voice.Type === 'Good deed' ? gdMarker : incidentMarker}>
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