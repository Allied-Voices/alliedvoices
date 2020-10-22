import React from 'react';
import LandingNeighborhood from '../../Images/LandingNeighborhood.svg';
import LandingStories from '../../Images/LandingStories.svg';
import LandingResources from '../../Images/LandingResources.svg';
import LandingBodyStyles from './LandingBody.module.css';

const LandingBody = () => {
  
  return (
    <div className={LandingBodyStyles.Container}>
      <div className={LandingBodyStyles.Images}>
        <img width="350px" height="250px" src={LandingNeighborhood} alt='Landing Page Neighborhood'></img>
        <img width="350px" height="250px" src={LandingStories} alt='Landing Page Stories'></img>
        <img width="350px" height="250px" src={LandingResources} alt='Landing Page Resources'></img>
      </div>

      <div className={LandingBodyStyles.Contents}>
        <div>
          <p className={LandingBodyStyles.Title}>Check out your neighborhood</p>
            <div className={LandingBodyStyles.Body}>
              Get an at-a-glance overview of the race-related<br></br>
              incidents in your area, so that you can be aware of<br></br>
              what’s going on in your neighborhood.
            </div>
        </div>
        <div>
          <p  className={LandingBodyStyles.Title}>Reading inspiring stories</p>
            <div className={LandingBodyStyles.Body}>
              Read stories of others who have gone through a<br></br>
              race-related incident. You’ll find a community of<br></br>
              people who understand what you’ve been through. 
            </div>
        </div>
        <div>
          <p  className={LandingBodyStyles.Title}>Access curated resources</p>
            <div className={LandingBodyStyles.Body}>
              Want to stand up for others, but don’t know where<br></br>
              to start? Check out our resources - curated for you,<br></br>
              so you can take action today.
            </div>
        </div>  
      </div>
    </div>
    
  );
}

export default LandingBody;