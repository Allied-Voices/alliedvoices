import React from 'react';
import SearchIcon from '../SearchIcon/SearchIcon';
import LandingSearchStyles from './LandingSearch.module.css';

const LandingSearch = () => {

  return (
    <form className={LandingSearchStyles.Container}>
      <input className={LandingSearchStyles.Input}>
      </input>
      <button className={LandingSearchStyles.ButtonContainer}>
        <SearchIcon secondary /> 
        Search
      </button>
    </form>
  );
}

export default LandingSearch;