import React from 'react';
import SearchIcon from '../SearchIcon/SearchIcon';
import LandingSearchStyles from './LandingSearch.module.css';

const LandingSearch = () => {

  return (
    <form className={LandingSearchStyles.Container}>
      <div className={LandingSearchStyles.Location}>
        LOCATION
      </div>  
      <input className={LandingSearchStyles.Input}>
      </input>
      <button className={LandingSearchStyles.ButtonContainer}>
        <SearchIcon secondary /> 
        <h4>Search</h4>
      </button>
    </form>
  );
}

export default LandingSearch;