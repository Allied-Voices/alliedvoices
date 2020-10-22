import React, { useState } from 'react';
import SearchIcon from '../SearchIcon/SearchIcon';
import SearchStyles from './Search.module.css'

const Search = ({placeholder, searchFunction, disabled, ...props}) => {
  const [text, setText] = useState('');

  let classNames = `${SearchStyles.Container}`;
  if(disabled){
    classNames += ` ${SearchStyles.Disabled}`
  }

  const onSubmit = (e) => {
    e.preventDefault();
    searchFunction(text);
  }

  return (
    <form className={classNames} onSubmit={onSubmit}>
      <SearchIcon primary />
      <input 
        className={SearchStyles.Input}
        onChange={(e) => { setText(e.target.value) }}
        autoComplete="off"
        placeholder={placeholder}
        disabled={disabled? true: false}
        >
      </input>
      <button className={SearchStyles.ArrowContainer} type="submit">
        <img className={SearchStyles.Arrow} style={text ? { filter: 'grayscale(0)', opacity: 1 } : null} alt="arrow to enter form" src="/assets/arrow.svg"></img>
      </button>
    </form>
  );
}

export default Search;