import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '../SearchIcon/SearchIcon';
import LandingSearchStyles from './LandingSearch.module.css';
import { AppContext } from '../../Context/AppContext';

const LandingSearch = () => {
  let history = useHistory();
  const appContext = useContext(AppContext);
  const [searchInput, setSearchInput] = useState("New York, New York");
  // For loading user's location. Disabled for now.
  // const didLoad = useRef(false);

  // useEffect(()=>{
  //   if(!didLoad.current && appContext.locations[0]){
  //     didLoad.current = true;
  //     setSearchInput(appContext.locations[0]);
  //   }
  // }, [searchInput, appContext.locations]);

  const search = (e) => {
    e.preventDefault();
    if(searchInput){
      if(searchInput !== appContext.locations[0] && searchInput){
        appContext.updateLocation(searchInput);
      }
      history.push("/map");
    }
  }

  return (
    <form className={LandingSearchStyles.Container} onSubmit={search}>
      <div className={LandingSearchStyles.Location}>
        LOCATION
      </div>  
      <input className={LandingSearchStyles.Input} value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}>
      </input>
      <button className={LandingSearchStyles.ButtonContainer}>
        <SearchIcon secondary /> 
        <h4>Search</h4>
      </button>
    </form>
  );
}

export default LandingSearch;