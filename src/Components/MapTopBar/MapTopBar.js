import React from 'react';
import MapTopBarStyles from './MapTopBar.module.css'
import SearchBar from '../SearchBar/SearchBar';

const MapTopBar = () => {
  return (
    <div className={MapTopBarStyles.Container}>
      <h1 className={MapTopBarStyles.test}>Allied Voices</h1>
      <SearchBar></SearchBar>
    </div>
  );
}

export default MapTopBar;