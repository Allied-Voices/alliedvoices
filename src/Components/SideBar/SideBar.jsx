import React, { useContext } from 'react';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ButtonMenu from '../ButtonMenu/ButtonMenu'
import Button from '../Button/Button'
import { AppContext } from '../../Context/AppContext'
import SideBarArticle from '../SideBarArticle/SideBarArticle'
import SideBarStyles from './SideBar.module.css'

const SideBar = () => {
  const appContext = useContext(AppContext)

  return (
    <div className={SideBarStyles.Container}>

      <div className={SideBarStyles.Header}>
        <Logo primary />
        <h3>Allied Voices</h3>
      </div>

      <div className={SideBarStyles.SearchSection}>
        <Search />
      </div>

      <div className={SideBarStyles.FilterSection}>
        <Button label='Location' active />
        <ButtonMenu label='Type' options={['Good Deed', 'Race-Related Incident']} />
        <ButtonMenu label='Race' options={['Asian', 'Black']} />
        <ButtonMenu label='Time' />
        <ButtonMenu label='More Filters' />
      </div>

      <div className={SideBarStyles.ArticleSection}>
        {appContext.voices.rows && appContext.voices.rows.map((voice, index) =>
          <SideBarArticle
            key={index}
            index={index} 
            heading={voice.Name} 
            date={voice.Date} 
            lat={voice.lat} 
            lng={voice.lng} 
            publisher={voice.Publisher} 
            type={voice.Type} 
            onClick={() => appContext.selectArticle(index)}
            selected={index===appContext.selected}
          />
        )}
      </div>

    </div>
  );
}

export default SideBar;