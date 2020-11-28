import React, { useState, useRef, useEffect } from "react";
import Button from "../Button/Button";
import ButtonMenuOption from "../ButtonMenuOption/ButtonMenuOption";
import Search from "../Search/Search";
import ButtonMenuStyles from "./ButtonMenu.module.css";

const ButtonMenu = ({
  buttonLabel,
  includeSearch,
  searchTitle,
  searchPlaceholder,
  searchFunction,
  optionsTitle,
  options,
  optionChangeFunction,
  filterKey,
  filterFunction,
  clearFunction,
  ...props
}) => {
  const menuRef = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [menuOpened, toggleMenu] = useState(false);

  // Logic for clicking outside of the component
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      toggleMenu(false);
    }
  };

  const handleChange = (option) => {
    return (e) => {
      if (e.target.checked) {
        setSelectedOptions([...selectedOptions, option]);
      } else {
        let newArr = selectedOptions.filter((item) => item !== option);
        setSelectedOptions(newArr);
      }
    };
  };

  const handleFilterClick = () => {
    if (filterFunction) {
      filterFunction(filterKey, selectedOptions);
      toggleMenu(false);
    } else {
    }
  };

  const handleClearClick = () => {
    //When the clear button is clicked, the selected options is given an empty array
    setSelectedOptions([]);
  };

  const renderMenu = () => {
    var menuItems = [];

    if (searchTitle && includeSearch) {
      menuItems.push(<h3 key={searchTitle}>{searchTitle}</h3>);

      menuItems.push(
        <Search
          key={"seach"}
          searchFunction={searchFunction ? searchFunction : null}
          placeholder={searchPlaceholder}
          searchf
        />
      );
    }

    if (optionsTitle && Array.isArray(options) && options[0]) {
      menuItems.push(<h3 key={optionsTitle}>{optionsTitle}</h3>);

      options.forEach((option) => {
        menuItems.push(
          <ButtonMenuOption
            key={option}
            option={option}
            onChange={handleChange(option)}
            selected={selectedOptions.includes(option)}
          />
        );
      });

      menuItems.push(
        <div key="filter" className={ButtonMenuStyles.FilterContainer}>
          <Button
            className={ButtonMenuStyles.ClearFilter}
            style={{ padding: "8px 16px" }}
            onClick={handleClearClick}
            label="Clear"
            disabled={selectedOptions.length < 1}
            primary
          />
          <Button
            style={{ padding: "8px 16px" }}
            onClick={handleFilterClick}
            label="Filter"
            alternative
          />
        </div>
      );
    }

    return <div className={ButtonMenuStyles.MenuContainer}>{menuItems}</div>;
  };

  return (
    <div className={ButtonMenuStyles.Container} ref={menuRef}>
      <Button
        onClick={() => toggleMenu(!menuOpened)}
        label={buttonLabel}
        active={menuOpened || selectedOptions[0]}
      ></Button>

      {menuOpened && renderMenu()}
    </div>
  );
};

export default ButtonMenu;
