import React from 'react';
import LandingNeighborhood from '../../Images/LandingNeighborhood.svg';
import LandingStories from '../../Images/LandingStories.svg';
import LandingResources from '../../Images/LandingResources.svg';
import LandingBodyStyles from './LandingBody.module.css';

const LandingBody = () => {
  
  return (
    <div className={LandingBodyStyles.Container}>
      <LandingNeighborhood />
    </div>
  );
}

export default LandingBody;