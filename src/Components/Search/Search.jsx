import React, { useState } from 'react';
import SearchIcon from '../SearchIcon/SearchIcon';
import SearchStyles from './Search.module.css'

const Search = () => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Submit')
  }

  return (
    <form className={SearchStyles.Container} onSubmit={onSubmit}>
      <SearchIcon primary />
      <input className={SearchStyles.Input}
        onChange={(e) => { setText(e.target.value) }}
        autoComplete="off"
        placeholder='i.e. verbal assault, microaggressions, good deeds, etc. '>
      </input>
      <button className={SearchStyles.ArrowContainer} type="submit">
        <img className={SearchStyles.Arrow} style={text ? { filter: 'grayscale(0)', opacity: 1 } : null} alt="arrow to enter form" src="/assets/arrow.svg"></img>
      </button>
    </form>
  );
}

export default Search;