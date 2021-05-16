import React, { useEffect, useContext, useRef } from 'react';
// import useDebounce from '../../CustomHooks/use-debounce'
import { Map as LeafletMap, TileLayer, ZoomControl, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import MapStyles from './MapStyles.module.css'
import { AppContext } from '../../Context/AppContext'
// import determineLocationZoom from '../../utils/locationTypes'

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
  const appContext = useContext(AppContext);
  const mapRef = useRef();
  const didClick = useRef(false);

  useEffect(() => {
    setTimeout(()=>{mapRef.current.leafletElement.invalidateSize()}, 450);
  }, [appContext.articleSelected, mapRef]);

  useEffect(() => {
    
    mapRef.current.leafletElement.setView({lat:appContext.orgLat, lng:appContext.orgLng}, appContext.zoom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.orgLat, appContext.orgLng]);

  useEffect(() => {
    const zoom = mapRef.current.leafletElement.getZoom();
    mapRef.current.leafletElement.setView({lat:appContext.articleSelectedLat, lng:appContext.articleSelectedLng}, zoom);
  }, [appContext.articleSelectedLat, appContext.articleSelectedLng]);

  useEffect(() => {
    mapRef.current.leafletElement.setZoom(appContext.zoom);
  }, [appContext.zoom]);

  const handleMoveEnd = () => {
    if(didClick.current){
      didClick.current = false;
      let mapCurrentPosition = mapRef.current.leafletElement.getCenter();
      if((Math.abs(mapCurrentPosition.lat  - appContext.orgLat) > 0.25 || Math.abs(mapCurrentPosition.lng  - appContext.orgLng) > 0.25)) {
        const zoom = mapRef.current.leafletElement.getZoom();
        console.log('Locaion refreshed');
        appContext.refreshLocation({lat:mapCurrentPosition.lat, lng:mapCurrentPosition.lng}, zoom);
      };
    }
  };

  const handleMouseDown = () => {
    didClick.current = true;
  };

  return (
    <LeafletMap ref={mapRef} className={MapStyles.Map} zoomControl={false} onmousedown={handleMouseDown} onmoveend={handleMoveEnd}>
      <TileLayer
        attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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