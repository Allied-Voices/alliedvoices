import React from 'react';
import LandingNeighborhood from '../../Images/LandingNeighborhood.svg';
import LandingStories from '../../Images/LandingStories.svg';
import LandingResources from '../../Images/LandingResources.svg';
import LandingBodyStyles from './LandingBody.module.css';

const LandingBody = () => {
  
  return (
    <div className={LandingBodyStyles.Container}>
      <div className={LandingBodyStyles.Images}>
        <img src={LandingNeighborhood} alt='Landing Page Neighborhood'></img>
        <img src={LandingStories} alt='Landing Page Stories'></img>
        <img src={LandingResources} alt='Landing Page Resources'></img>
      </div>

      <div className={LandingBodyStyles.Headers}>
        <p>Check out your neighborhood</p>
        <p>Reading inspiring stories</p>
        <p>Access curated resources</p>
      </div>
    </div>
    
  );
}

export default LandingBody;