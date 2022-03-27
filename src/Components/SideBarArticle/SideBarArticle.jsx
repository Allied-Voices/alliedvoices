import React, { useContext } from 'react';
import Logo from '../Logo/Logo';
import { AppContext } from '../../Context/AppContext';
import SideBarArticleStyles from './SideBarArticleStyles.module.css';
import GoodDeedHeart from '../../Images/GoodDeedHeart.svg';
import IncidentHeart from '../../Images/IncidentHeart.svg';
import useDistMsgCreator from '../../CustomHooks/use-dist-msg-creator';
import { calculateTimeSpan } from '../../utils/date';

const SideBarArticle = React.memo(({ index, heading, date, lat, lng, publisher, img, type, onClick, onDoubleClick,selected }) => {
  const appContext = useContext(AppContext);
  const { createDistMsg } = useDistMsgCreator(); 
  const dateMsg = calculateTimeSpan(date);
  const distanceMsg = createDistMsg(appContext.orgLat, appContext.orgLng, lat, lng);

  return (
    <div className={`${SideBarArticleStyles.Container}` + (selected? ` ${SideBarArticleStyles.Selected}`:'')} onClick={onClick} onDoubleClick={onDoubleClick}>
      <div className={SideBarArticleStyles.ImgContainer}>
        {img ?
          <img src={img} alt={`${heading}`} /> :
          <Logo primary height="45" width="45"></Logo>
        }
      </div>
      <div className={SideBarArticleStyles.Text}>
        <h4>{heading}</h4>
        <div className={SideBarArticleStyles.subHeading}>
          {((type === 'Acts of Allyship' || type === 'Stories of Empowerment' || type === 'Resources')) ? <img src={GoodDeedHeart} alt='Good deed heart' /> : <img src={IncidentHeart} alt='Good deed heart'/>}
          <p>{dateMsg} {distanceMsg && "· " + distanceMsg} · {publisher}</p>
        </div>
      </div>
    </div>
  );
})

export default SideBarArticle;