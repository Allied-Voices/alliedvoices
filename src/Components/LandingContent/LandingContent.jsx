import React, { useContext } from 'react';
import LandingContentStyles from './LandingContent.module.css';
import LandingHero from '../../Images/LandingMap2.png';
import Linkedin from '../../Images/Linkedin.png';
import Facebook from '../../Images/Facebook.png';
import Instagram from '../../Images/Instagram.png';
import Contribute from '../../Images/contribute2.jpg';
import useLandingNewYorkButton from './useLandingNewYorkButton';
import { AppContext } from '../../Context/AppContext';
import LandingStories from '../LandingStories/LandingStories';
import LandingResources from '../LandingResources/LandingResources';

const LandingHeader = () => {
  const appContext = useContext(AppContext);
  const { goToMap } = useLandingNewYorkButton();
  // Randomizer for grabbing articles and resources
  function getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
  return (
    <div className={LandingContentStyles.LandingPageContainer}>
      <div className={LandingContentStyles.HeaderContainer}>
        <div className={LandingContentStyles.Header}>
          <h2 className={LandingContentStyles.Logo}>Allied Voices</h2>
          <p className={LandingContentStyles.LogoAbout}>About Us</p>
        </div>
        <div className={LandingContentStyles.HeaderDiv}>
          <div className={LandingContentStyles.HeaderLeft}>
            <h2 className={LandingContentStyles.HeaderTitle}>
              Navigate your racial landscape
            </h2>
            <p className={LandingContentStyles.HeaderPara}>
            Explore our beta of New York City. Read race-related incidents and stories of allyship in the area. Learn how heroes and communities are rising up against racism. 
            Access resources on allyship and join the conversation.
            </p>
            <button
              className={LandingContentStyles.HeaderBtn}
              onClick={goToMap}
            >
              <span> Check it out </span>
            </button>
          </div>
          <div className={LandingContentStyles.HeaderRight}>
            <img
              className={LandingContentStyles.Hero}
              src={LandingHero}
              alt='Landing Page Map'
            ></img>
          </div>
        </div>
      </div>
      <div className={LandingContentStyles.Part2Container}>
      <div className={LandingContentStyles.AllyContainer}>
        <h2 className={LandingContentStyles.AllyTitle}>
          Read stories of allyship
        </h2>
        <div className={LandingContentStyles.StoryContainer}>
          {appContext.articles.rows.length ? (
           getRandom(appContext.articles.rows.filter((article) => article.Type === "Stories of Empowerment" || article.Type === "Acts of Allyship" && article.Image), 3).map((article, index) => (
              <LandingStories
                key={index}
                index={index}
                heading={article.Name}
                image={article.Image}
                url={article.URL}
              />
            ))
          ) : (
            <div>No resources found</div>
          )}
        </div>
      </div>
      <div className={LandingContentStyles.ContributeContainer}>
        
          <div className={LandingContentStyles.ContributeBoxDiv}>
            <h2 className={LandingContentStyles.ContributeTitle}>
              Contribute your own story
            </h2>
            <p className={LandingContentStyles.ContributeDesc}>
              Join our community, and share your own story.{' '}
            </p>
            <button className={LandingContentStyles.ContributeBtn}>
              <span className={LandingContentStyles.ContributeBtnText}>
                Contribute
              </span>
            </button>
          </div>
          <div className={LandingContentStyles.ContributeImgBox}>
            <img
              className={LandingContentStyles.ContributeImg}
              src={Contribute}
              alt='Contribute'
            ></img>
          </div>
        
      </div>
      <div className={LandingContentStyles.ResourceContainer}>
        <h2 className={LandingContentStyles.AllyTitle}>
          Access curated resources
        </h2>
        <div className={LandingContentStyles.ResourceBox}>
          {appContext.resources.rows.length ? (
            getRandom(appContext.resources.rows, 4).map((resources, index) => (
              <LandingResources
                key={index}
                index={index}
                heading={resources.Title}
                image={resources.Image}
                url={resources.URL}
              />
            ))
          ) : (
            <div>No resources found</div>
          )}
        </div>
      </div>
      </div>
      <div className={LandingContentStyles.Footer}>
        <div className={LandingContentStyles.FooterAllied}>
          <p className={LandingContentStyles.FooterAlliedText}>
            ally@alliedvoices.org
          </p>
        </div>
        <div className={LandingContentStyles.FooterSocial}>
          <a href='https://www.linkedin.com/company/allied-voices/'>
            <img
              className={LandingContentStyles.FooterLinkedIn}
              src={Linkedin}
              alt='Linkedin'
            ></img>
          </a>
          <a href='https://www.facebook.com/alliedvoicesglobal/'>
            <img
              className={LandingContentStyles.FooterImg}
              src={Facebook}
              alt='Facebook'
            ></img>
          </a>
          <a href='https://www.instagram.com/alliedvoicesglobal/'>
            <img
              className={LandingContentStyles.FooterImg}
              src={Instagram}
              alt='Instagram'
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingHeader;
