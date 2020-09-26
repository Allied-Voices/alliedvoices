import React from 'react';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import SideBarStyles from './SideBar.module.css'

const SideBar = () => {
  return (
    <div className={SideBarStyles.Container}>
      <div className={SideBarStyles.Header}>
        <Logo primary />
        <h3>Allied Voices</h3>
      </div>
      <div className={SideBarStyles.SearchSection}>
        <Search />
      </div>
    </div>
  );
}

export default SideBar;