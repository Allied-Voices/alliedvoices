import React, { useContext } from 'react';
import Logo from '../Logo/Logo';
import { AppContext } from '../../Context/AppContext'
import SideBarArticleStyles from './SideBarArticleStyles.module.css'
import GoodDeedHeart from '../../Images/GoodDeedHeart.svg'
import IncidentHeart from '../../Images/IncidentHeart.svg'
import { calculateDistance }  from '../../utils/distance'
import { calculateTimeSpan } from '../../utils/date'

const SideBarArticle = React.memo(({ index, heading, date, lat, lng, publisher, img, type, onClick, selected }) => {

  const appContext = useContext(AppContext)

  const dateMsg = calculateTimeSpan(date)
  
  // Determine distance
  var distanceMsg;
  if (appContext) {
    distanceMsg = calculateDistance(appContext.lat, appContext.lng, lat, lng)
  } else {
    distanceMsg = "Unknown"
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
          <p>{dateMsg} · {distanceMsg} · {publisher}</p>
        </div>
      </div>
    </div>
  );
})

export default SideBarArticle;