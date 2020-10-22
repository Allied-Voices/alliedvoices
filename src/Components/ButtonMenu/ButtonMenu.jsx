import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button'
import ButtonMenuOption from '../ButtonMenuOption/ButtonMenuOption';
import Search from '../Search/Search';
import ButtonMenuStyles from './ButtonMenu.module.css'

const ButtonMenu = ({ buttonLabel, includeSearch, searchTitle, searchPlaceholder, searchFunction, optionsTitle, options, ...props }) => {
  const menuRef = useRef(null);
  const [selectedItems, setItems] = useState([]);
  const [menuOpened, toggleMenu] = useState(false);

  // Logic for clicking outside of the component
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = e => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      toggleMenu(false);
    }
  };

  const handleChange = (option) => {
    return (e) => {
      console.log('test')
      if (e.target.checked) {
        setItems([...selectedItems, option])
      } else {
        let newArr = selectedItems.filter((item) => item !== option)
        setItems(newArr)
      }
    }
  }

  const renderMenu = () => {
    var menuItems = [];

    if(searchTitle && includeSearch){
      menuItems.push(
        <h3 key={searchTitle} >{searchTitle}</h3>
      )

      menuItems.push(
          <Search key={'seach'} searchFunction={ searchFunction? searchFunction : null} placeholder={searchPlaceholder} searchf/>
      )
    }

    if(optionsTitle && Array.isArray(options) && options[0]){
      menuItems.push(
        <h3 key={optionsTitle} >{optionsTitle}</h3>
      )

      options.forEach((option) => {
        menuItems.push(<ButtonMenuOption key={option} option={option} onChange={handleChange(option)} selected={selectedItems.includes(option)} />)
      })

      menuItems.push(
        <div key='filter' className={ButtonMenuStyles.FilterContainer}>
          <Button style={{padding:'8px 16px'}} label="Filter" alternative/>
        </div>
      )
    }

    return (
      <div className={ButtonMenuStyles.MenuContainer} >
        {menuItems}
      </div>
    )
  }

  return (
    <div className={ButtonMenuStyles.Container} ref={menuRef}>
      <Button onClick={() => toggleMenu(!menuOpened)} label={buttonLabel} active={menuOpened || selectedItems[0]}></Button>

      { menuOpened && renderMenu()}

    </div>);
}

export
  default ButtonMenu