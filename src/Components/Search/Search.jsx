import React, { useState } from 'react';
import SearchIcon from '../SearchIcon/SearchIcon';
import SearchStyles from './Search.module.css'

const Search = ({placeholder, searchFunction, filterFunction, disabled, ...props}) => {
  const [text, setText] = useState('');
  const [isError, setIsError] = useState(false);

  let classNames = `${SearchStyles.Container}`;

  if(disabled){
    classNames += ` ${SearchStyles.Disabled}`
  }

  if(isError){
    classNames += ` ${SearchStyles.Error}`
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(searchFunction){
      var locationFound = await searchFunction(text);
      if(!locationFound) {
        setIsError(true);
      }
    }else if(filterFunction){
      filterFunction('search', [text]);
    }
  }

  return (
    <>
      <form className={classNames} onSubmit={onSubmit}>
        <SearchIcon primary />
        <input 
          className={SearchStyles.Input}
          onChange={(e) => { setText(e.target.value); setIsError(false); }}
          autoComplete="off"
          placeholder={placeholder}
          disabled={disabled? true: false}
          >
        </input>
        <button className={SearchStyles.ArrowContainer} type="submit">
          <img className={SearchStyles.Arrow} style={text ? { filter: 'grayscale(0)', opacity: 1 } : null} alt="arrow to enter form" src="/assets/arrow.svg"></img>
        </button>
      </form>
      { isError && 
        <p className={SearchStyles.ErrorText}>
          Please enter a valid address.
        </p>
      }
    </>
  );
}

export default Search;