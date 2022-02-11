import React, { useEffect, useContext, useRef } from 'react';
import L from 'leaflet'
import { Marker, Popup } from 'react-leaflet';
import { AppContext } from '../../Context/AppContext'

const AvMarker = ({voice, index, icon, ...props}) => {
  const appContext = useContext(AppContext);
  const markerRef = useRef();

  useEffect(() => {
    if(voice.id === appContext.articleSelected){
      markerRef.current.leafletElement.openPopup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.articleSelected]);

  const gdMarker = new L.Icon({
    iconUrl: '/assets/gd-marker.svg',
    iconRetinaUrl: '/assets/gd-marker.svg',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [-1, -9],
  });
  
  const gdMarkerSelected = new L.Icon({
    iconUrl: '/assets/gd-marker.svg',
    iconRetinaUrl: '/assets/gd-marker.svg',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [-2, -14],
  });
  
  const incidentMarker = new L.Icon({
    iconUrl: '/assets/incident-marker.svg',
    iconRetinaUrl: '/assets/incident-marker.svg',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [-1, -9],
  });
  
  const incidentMarkerSelected = new L.Icon({
    iconUrl: '/assets/incident-marker.svg',
    iconRetinaUrl: '/assets/incident-marker.svg',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [-2, -14],
  });

  const determineMarkerIcon = (voiceType, voiceId) => {
    if(voiceType === 'Acts of Allyship' || voiceType === 'Stories of Empowerment' || voiceType === 'Resources'){
      return (voiceId === appContext.articleSelected) ? gdMarkerSelected : gdMarker ;
    }
    else 
    return (voiceId === appContext.articleSelected) ?incidentMarkerSelected:incidentMarker;
   
  };

  return (
    <Marker
    ref = {markerRef}
    onclick={() => appContext.selectArticle(voice.id)} 
    key={`${voice.id}-${voice.lat}-${voice.lng}`} 
    position={[voice.lat, voice.lng]} 
    icon={determineMarkerIcon(voice.Type, voice.id)}>
      <Popup>
        <strong>{voice.Name}</strong><br />
        <strong>Type: </strong>{voice.Type}<br />
      </Popup>
    </Marker>
  );

}

export default AvMarker;