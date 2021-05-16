import React, { useEffect, useContext, useRef } from 'react';
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet';
import { AppContext } from '../../Context/AppContext'

const AvMarker = ({voice, index, icon, ...props}) => {
  const appContext = useContext(AppContext);
  const markerRef = useRef();

  useEffect(() => {
    if(index === appContext.articleSelected){
      markerRef.current.leafletElement.openPopup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.articleSelected]);

  const gdMarker = new L.Icon({
    iconUrl: '/assets/gd-marker.svg',
    iconRetinaUrl: '/assets/gd-marker.svg',
    iconSize: [25, 25],
    iconAnchor: [13, 25],
    popupAnchor: [0, -25],
  });
  
  const gdMarkerSelected = new L.Icon({
    iconUrl: '/assets/gd-marker.svg',
    iconRetinaUrl: '/assets/gd-marker.svg',
    iconSize: [25, 25],
    iconAnchor: [23, 35],
    popupAnchor: [0, -25],
  });
  
  const incidentMarker = new L.Icon({
    iconUrl: '/assets/incident-marker.svg',
    iconRetinaUrl: '/assets/incident-marker.svg',
    iconSize: [25, 23],
    iconAnchor: [13, 23],
    popupAnchor: [0, -23],
  });
  
  const incidentMarkerSelected = new L.Icon({
    iconUrl: '/assets/incident-marker.svg',
    iconRetinaUrl: '/assets/incident-marker.svg',
    iconSize: [35, 33],
    iconAnchor: [13, 23],
    popupAnchor: [0, -23],
  });

  const determineMarkerIcon = (voiceType, index) => {
    if (index === appContext.articleSelected) {
      return voiceType === 'Good deed' ? gdMarkerSelected : incidentMarkerSelected;
    } else {
      return voiceType === 'Good deed' ? gdMarker : incidentMarker;
    }
  };

  return (
    <Marker
    ref = {markerRef}
    onclick={() => appContext.selectArticle(index)} key={`${index}-${voice.lat}-${voice.lng}`} 
    position={[voice.lat, voice.lng]} 
    icon={determineMarkerIcon(voice.Type, index)}>
      <Popup>
        <strong>{voice.Name}</strong><br />
        <strong>Type: </strong>{voice.Type}<br />
      </Popup>
    </Marker>
  );

}

export default AvMarker;