import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button'
import ButtonMenuOption from '../ButtonMenuOption/ButtonMenuOption';
import ButtonMenuStyles from './ButtonMenuStyles.module.css'

const ButtonMenu = ({ label, options, ...props }) => {
  const menuRef = useRef(null);
  const [selectedItems, setItems] = useState([])
  const [menuOpened, toggleMenu] = useState(false)

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


  return (
    <div className={ButtonMenuStyles.Container} ref={menuRef}>
      <Button onClick={() => toggleMenu(!menuOpened)} label={label} active={menuOpened || selectedItems[0]}></Button>

      { (menuOpened && typeof (options) === 'object' && options[0]) &&
        <div className={ButtonMenuStyles.MenuContainer} >
          {options.map((option) => <ButtonMenuOption option={option} onChange={handleChange(option)} selected={selectedItems.includes(option)} />)}
        </div>
      }

    </div>);
}

export
  default ButtonMenu