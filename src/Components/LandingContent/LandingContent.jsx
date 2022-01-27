import React, { useContext } from 'react';
import LandingContentStyles from './LandingContent.module.css';
import LandingHero from '../../Images/LandingMap.png';
import Linkedin from '../../Images/Linkedin.png';
import Facebook from '../../Images/Facebook.png';
import Instagram from '../../Images/Instagram.png';
import Contribute from '../../Images/Contribute.png';
import useLandingNewYorkButton from './useLandingNewYorkButton';
import { AppContext } from '../../Context/AppContext';
import LandingStories from '../LandingStories/LandingStories';
import LandingResources from '../LandingResources/LandingResources';

const LandingHeader2 = () => {
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
    <div>
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
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book
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
      <div className={LandingContentStyles.AllyContainer}>
        <h2 className={LandingContentStyles.AllyTitle}>
          Read stories of allyship
        </h2>
        <div className={LandingContentStyles.StoryContainer}>
          {appContext.voices.rows.length ? (
            getRandom(appContext.voices.rows, 3).map((voice, index) => (
              <LandingStories
                key={index}
                index={index}
                heading={voice.Name}
                image={voice.Image}
                url={voice.URL}
              />
            ))
          ) : (
            <div>No articles found</div>
          )}
        </div>
      </div>
      <div className={LandingContentStyles.ContributeContainer}>
        <div className={LandingContentStyles.ContributeBox}>
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
      </div>
      <div className={LandingContentStyles.ResourceContainer}>
        <h2 className={LandingContentStyles.AllyTitle}>
          Access curated resources
        </h2>
        <div className={LandingContentStyles.ResourceBox}>
          {appContext.voices.rows.length ? (
            getRandom(appContext.resources.rows, 4).map((resource, index) => (
              <LandingResources
                key={index}
                index={index}
                heading={resource.Title}
                image={resource.Image}
                url={resource.URL}
              />
            ))
          ) : (
            <div>No resources found</div>
          )}
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
              className={LandingContentStyles.FooterImg}
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

export default LandingHeader2;
