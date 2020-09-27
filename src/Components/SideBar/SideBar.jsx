import React from 'react';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ButtonMenu from '../ButtonMenu/ButtonMenu'
import Button from '../Button/Button'
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
      <div className={SideBarStyles.FilterSection}>
        <Button label='Location' active />
        <ButtonMenu label='Type' />
        <ButtonMenu label='Race' />
        <ButtonMenu label='Time' />
        <ButtonMenu label='More Filters' />
      </div>
    </div>
  );
}

export default SideBar;