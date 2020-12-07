import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '../SearchIcon/SearchIcon';
import LandingSearchStyles from './LandingSearch.module.css';
import { AppContext } from '../../Context/AppContext';

const LandingSearch = () => {
  let history = useHistory();
  const appContext = useContext(AppContext);
  const [searchInput, setSearchInput] = useState("");

  useEffect(()=>{
    if(!searchInput && appContext.locations[0]){
      setSearchInput(appContext.locations[0]);
    }
  });

  const search = (e) => {
    e.preventDefault();
    if(searchInput !== appContext.locations[0]){
      appContext.updateLocation(searchInput);
    }
    history.push("/map");
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