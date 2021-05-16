import React, { useEffect, useContext, useRef } from 'react';
import { Map as LeafletMap, TileLayer, ZoomControl} from 'react-leaflet';
import AvMarker from '../AvMarker/AvMarker';
import MapStyles from './MapStyles.module.css';
import { AppContext } from '../../Context/AppContext';

const Map = () => {
  const appContext = useContext(AppContext);
  const mapRef = useRef();
  const didClick = useRef(false);

  useEffect(() => {
    setTimeout(()=>{mapRef.current.leafletElement.invalidateSize()}, 450);
  }, [appContext.articleToggled, mapRef]);

  useEffect(() => {
    mapRef.current.leafletElement.setView({lat:appContext.orgLat, lng:appContext.orgLng}, appContext.zoom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.orgLat, appContext.orgLng]);

  useEffect(() => {
    const zoom = mapRef.current.leafletElement.getZoom();
    let mapCurrentPosition = mapRef.current.leafletElement.getCenter();
    if((Math.abs(mapCurrentPosition.lat  - appContext.articleSelectedLat) < 0.02 || Math.abs(mapCurrentPosition.lng  - appContext.articleSelectedLng) < 0.02)){
      mapRef.current.leafletElement.panTo ({lat:appContext.articleSelectedLat, lng:appContext.articleSelectedLng}, zoom);
    }else{
      mapRef.current.leafletElement.flyTo ({lat:appContext.articleSelectedLat, lng:appContext.articleSelectedLng}, zoom);
    }
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
      {appContext.voices.rows && appContext.voices.rows.map((voice, index) => <AvMarker key={index} voice={voice} index={index}></AvMarker>)}
    </LeafletMap>
  );
}

export default Map;