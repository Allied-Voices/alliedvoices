import React from 'react';
import LandingNewYorkButtonStyles from './LandingNewYorkButton.module.css';
import SearchIcon from '../SearchIcon/SearchIcon';
import useLandingNewYorkButton from './useLandingNewYorkButton';


const LandingNewYorkButton = () => {
  const { goToMap } = useLandingNewYorkButton();

  return (
    <button class={LandingNewYorkButtonStyles.Button} onClick={goToMap}>
      <SearchIcon/>
      <span>New York</span>
    </button>
  );
};

export default LandingNewYorkButton;