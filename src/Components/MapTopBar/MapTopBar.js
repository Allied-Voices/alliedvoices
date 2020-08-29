import React from 'react';
import MapTopBarStyles from './MapTopBar.module.css'
import SearchBar from '../SearchBar/SearchBar';

const MapTopBar = (props) => {
  return (
    <div className={MapTopBarStyles.Container}>
      <div className={MapTopBarStyles.LogoContainer}>
        <a className={MapTopBarStyles.Anchor} href="/">
          <img className={MapTopBarStyles.Logo} src="./logo.svg" alt="allied voices logo"></img>
          <h1 className={MapTopBarStyles.Title}>Allied Voices</h1>
        </a>
      </div>
      <SearchBar changeLocation={props.changeLocation} refreshVoices={props.refreshVoices}></SearchBar>
    </div>
  );
}

export default MapTopBar;