import React from 'react';
import Logo from '../Logo/Logo';
// import LandingSearch from '../LandingSearch/LandingSearch';
// import LandingBody from '../LandingBody/LandingBody';
import { Link } from 'react-router-dom'
import LandingHeaderStyles from './LandingHeader.module.css';

const LandingHeader = () => {

  return (
    <div className={LandingHeaderStyles.Container}>
      <div className={LandingHeaderStyles.Logo}>
        <Logo secondary width='62' height='60'/>
      </div>
      <div className={LandingHeaderStyles.Name}>
        <h3>Allied Voices</h3>
      </div>
      
      <div className={LandingHeaderStyles.ButtonContainer}>
        <Link to='/map'>
          <button className={LandingHeaderStyles.Button}>
          <span>Enter Site </span>
          <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.78725 3.44082L5.82457 0.243535C5.7579 0.167826 5.67786 0.107281 5.58917 0.0654676C5.50048 0.0236539 5.40494 0.00141657 5.30816 6.5501e-05C5.21139 -0.00128557 5.11534 0.0182769 5.02568 0.0576007C4.93602 0.0969245 4.85455 0.155214 4.78609 0.229037C4.71762 0.302859 4.66354 0.390721 4.62702 0.487448C4.5905 0.584175 4.57229 0.687809 4.57346 0.792248C4.57463 0.896687 4.59515 0.999818 4.63382 1.09557C4.67248 1.19131 4.72852 1.27774 4.79861 1.34976L6.54994 3.23686H0.725371C0.532991 3.23686 0.34849 3.31933 0.212456 3.46614C0.0764229 3.61294 0 3.81205 0 4.01967C0 4.22728 0.0764229 4.42639 0.212456 4.5732C0.34849 4.72 0.532991 4.80248 0.725371 4.80248H6.53374L4.79861 6.67792C4.66824 6.82595 4.59665 7.02311 4.59909 7.22732C4.60154 7.43153 4.67784 7.62662 4.81171 7.77096C4.94559 7.91531 5.12643 7.99748 5.31566 7.99994C5.50488 8.00241 5.68751 7.92496 5.82457 7.78414L8.78725 4.58686C8.85485 4.51435 8.90843 4.42808 8.94489 4.33305C8.98135 4.23802 8.99996 4.13612 8.99965 4.03326C9.00012 4.0268 9.00012 4.0203 8.99965 4.01384C9.00007 4.00737 9.00007 4.00088 8.99965 3.99441C8.99958 3.78681 8.9232 3.58771 8.78725 3.44082Z" fill="black"/>  
          </svg>
          </button> 
        </Link>
      </div>

      {/* <div className={LandingHeaderStyles.SearchSection}>
        <LandingSearch />
      </div> */}

      <h2>Navigate your racial landscape</h2>

    {/* <div>
      <LandingBody />
    </div> */}
    </div>
  );
}

export default LandingHeader;