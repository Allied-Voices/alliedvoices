import React, { Component } from 'react';
import LandingHeader from '../../Components/LandingHeader/LandingHeader';
import LandingContent from '../../Components/LandingContent/LandingContent';
import LandingNeighborhood from '../../Images/LandingNeighborhood.svg';
import LandingStories from '../../Images/LandingStories.svg';
import LandingResources from '../../Images/LandingResources.svg';
import LandingPageStyles from './LandingPage.module.css';

class LandingPage extends Component {
  
  state = {}
  render() {
    return (
      <div>
        <LandingHeader />
        <div className={LandingPageStyles.FooterContainer}>
          <LandingContent image={LandingNeighborhood} alt='Landing Page Neighborhood' title='Check out your neighborhood' content='Get an at-a-glance overview of the race-related incidents in your area so that you can be aware of what’s going on in your neighborhood.'/>
          <LandingContent image={LandingStories} alt='Landing Page Stories' title='Reading inspiring stories' content='Read stories of others who have gone through a race-related incident. You’ll find a community of people who understand what you’ve been through.'/>
          <LandingContent image={LandingResources} alt='Access curated resources' title='Access curated resources' content='Want to stand up for others, but don’t know where to start? Check out our resources - curated for you so you can take action today.'/>
        </div>
      </div>
    );
  }
}

export default LandingPage;