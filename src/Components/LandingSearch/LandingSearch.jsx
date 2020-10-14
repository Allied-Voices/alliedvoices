import React, {useState} from 'react';
import SearchIcon from '../SearchIcon/SearchIcon';
import LandingSearchStyles from './LandingSearch.module.css';

const LandingSearch = (label) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className={LandingSearchStyles.Container} onSubmit={onSubmit}>
      <input className={LandingSearchStyles.Input}
        onChange={(e) => { setText(e.target.value) }}
        autoComplete="off">
      </input>
      <button className={LandingSearchStyles.ButtonContainer}>
        <SearchIcon secondary /> 
        Search
      </button>
    </form>
  );
}

export default LandingSearch;