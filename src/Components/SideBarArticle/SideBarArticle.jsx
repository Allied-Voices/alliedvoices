import React, { useContext, useMemo } from 'react';
import Logo from '../Logo/Logo';
import { AppContext } from '../../Context/AppContext'
import SideBarArticleStyles from './SideBarArticleStyles.module.css'
import GoodDeedHeart from '../../Images/GoodDeedHeart.svg'
import IncidentHeart from '../../Images/IncidentHeart.svg'

const SideBarArticle = React.memo(({ index, heading, date, lat, lng, publisher, img, type, onClick, selected }) => {

  const appContext = useContext(AppContext)

  const diff = Date.now() - Date.parse(date)
  var dateMsg;
  if (diff < 60000) dateMsg = `${diff / 1000} seconds ago`;
  else if (diff < 3600000) dateMsg = `${diff / 1000 / 60} minutes ago`;
  else if (diff < 86400000) dateMsg = `${diff / 1000 / 60 / 25} hours ago`;
  else dateMsg = new Date(Date.parse(date)).toLocaleDateString();

  // Determine distance
  var d;
  if (appContext && appContext.lat && appContext.lng && lat && lng) {
    const rad1 = lat * Math.PI / 180;
    const rad2 = appContext.lat * Math.PI / 180;
    const diffLat = (appContext.lat - lat) * Math.PI / 180;
    const diffLng = (appContext.lng - lng) * Math.PI / 180;
    const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(rad1) * Math.cos(rad2) * Math.sin(diffLng / 2) * Math.sin(diffLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    d = Math.floor(3958.8 * c);
  } else {
    d = "Unknown"
  }

  return (
    <div className={`${SideBarArticleStyles.Container}` + (selected? ` ${SideBarArticleStyles.Selected}`:'')} onClick={onClick}>
      <div className={SideBarArticleStyles.ImgContainer}>
        {img ?
          <img src={img} alt={`${heading}`} /> :
          <Logo primary height="45" width="45"></Logo>
        }
      </div>
      <div className={SideBarArticleStyles.Text}>
        <h4>{heading}</h4>
        <div className={SideBarArticleStyles.subHeading}>
          {type === "Good deed" ? <img src={GoodDeedHeart} alt='Good deed heart' /> : <img src={IncidentHeart} alt='Good deed heart'/>}
          <p>{dateMsg} · {`${d} mi away`} · {publisher}</p>
        </div>
      </div>
    </div>
  );
})

export default SideBarArticle;