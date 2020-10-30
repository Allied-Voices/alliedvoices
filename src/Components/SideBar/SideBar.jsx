import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ButtonMenu from '../ButtonMenu/ButtonMenu'
import { AppContext } from '../../Context/AppContext'
import SideBarArticle from '../SideBarArticle/SideBarArticle'
import SideBarStyles from './SideBar.module.css'

const SideBar = () => {
  const appContext = useContext(AppContext)

  return (
    <div className={SideBarStyles.Container}>

      <div className={SideBarStyles.Header}>
        <Link to ="/">
          <Logo primary width='42' height='40' />
          <h3>Allied Voices</h3>
        </Link>
      </div>

      <div className={SideBarStyles.SearchSection}>
        <Search placeholder={'Search for Voices'} filterFunction={appContext.filterVoices}/>
        {/* <Search placeholder={'i.e. verbal assault, microaggressions, good deeds, etc. '} /> */}
      </div>

      <div className={SideBarStyles.FilterSection}>
        <ButtonMenu 
          buttonLabel={"Location"} 
          includeSearch={true}
          searchTitle='See Voices from a different location' 
          searchPlaceholder='Enter location here' 
          searchFunction={appContext.updateLocation}
          optionsTitle="Select location type here"
          options={['Public Space', 'Commute', 'Workplace', 'Home', 'Place of Worship', 'Online']}
          filterFunction = {appContext.filterVoices}
          filterKey = "Location Tags"
        />
        <ButtonMenu 
          buttonLabel='Type' 
          optionsTitle='Filter by Content Type' 
          options={['Race-related incident', 'Opinion', 'Good deed']} 
          filterFunction = {appContext.filterVoices}
          filterKey = "Type"
        />
        <ButtonMenu 
          buttonLabel='Source' 
          optionsTitle='Filter by Source' 
          options={['News', 'Reporting Center', 'Social Media', 'User Submissions']}
          filterFunction = {appContext.filterVoices}
          filterKey = "Content Type"
        />
        <ButtonMenu 
          buttonLabel='Incident Tags'
          optionsTitle='Filter by Incident Tags'
          options={['Physical', 'Verbal', 'Vandalism']}
          filterFunction = {appContext.filterVoices}
          filterKey = "Incident type"
        />
        <ButtonMenu 
          buttonLabel='Race' 
          optionsTitle='Filter by Race' 
          options={['Asian', 'Black']} 
          filterFunction = {appContext.filterVoices}
          filterKey = "Race"
        />
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