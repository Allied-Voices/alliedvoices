import React from 'react';
import Logo from '../Logo/Logo';
import LandingSearch from '../LandingSearch';
import LandingBody from '../LandingBody';
import LandingHeaderStyles from './LandingHeader.module.css';

const LandingHeader = () => {

  return (
    <div className={LandingHeaderStyles.Container}>
      <div className={LandingHeaderStyles.Header}>
        <Logo secondary />
        <h3>Allied Voices</h3>
      </div>

      <div className={LandingHeaderStyles.SearchSection}>
        <LandingSearch />
      </div>
    <h2>Navigate your racial landscape</h2>

    <div>
      <LandingBody />
    </div>
    </div>
  );
}

export default LandingHeader;