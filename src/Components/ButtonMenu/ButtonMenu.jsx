import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button'
import ButtonMenuOption from '../ButtonMenuOption/ButtonMenuOption';
import Search from '../Search/Search';
import ButtonMenuStyles from './ButtonMenu.module.css'

const ButtonMenu = ({ buttonLabel, includeSearch, searchTitle, searchPlaceholder, searchFunction, optionsTitle, options, optionChangeFunction, filterKey, filterFunction, clearFunction, ...props }) => {
  const menuRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  //start with an empty array
  //
  const [isChecked, setIsChecked] = useState([]);
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
      if (e.target.checked) {
        setSelectedOptions([...selectedOptions, option]);
        //for each of the selected options -> change the isChecked to true
        // setIsChecked([...isChecked, e.target.checked])
        // console.log(isChecked)
      } else {
        // newArr is the remaining checked boxes
        // keep the item that's not deselected
        let newArr = selectedOptions.filter((item) => item !== option)
        setSelectedOptions(newArr)
        // console.log(selectedOptions);
        console.log(newArr);
      }
    }
  }

  const handleFilterClick = () => {
    if(filterFunction) filterFunction(filterKey, selectedOptions);
    console.log(selectedOptions);
  }

  const handleClearClick = () => {
    
    // if (e.target.name === 'clear' && selectedOptions.length > 1) {
    //   console.log(selectedOptions);
    // } 
    //if (selectedOptions.length > 1) 
    //if(selectedOptions.length > 1) clearFunction(filterKey, selectedOptions);
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
        //selected = whether the option is selected
        menuItems.push(<ButtonMenuOption
          key={option}
          option={option}
          onChange={handleChange(option)}
          selected={selectedOptions.includes(option)}/>)
      })

      menuItems.push(
        <div key='filter' className={ButtonMenuStyles.FilterContainer}>
          <Button className={ButtonMenuStyles.ClearFilter} style={{padding: '8px 16px'}} onClick={handleClearClick} label="Clear" disabled={selectedOptions.length < 1} primary/>
          <Button style={{padding:'8px 16px'}} onClick={handleFilterClick} label="Filter" alternative/>
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
      <Button onClick={() => toggleMenu(!menuOpened)} label={buttonLabel} active={menuOpened || selectedOptions[0]}></Button>

      { menuOpened && renderMenu()}

    </div>);
}

export
  default ButtonMenu