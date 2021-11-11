import React, {useContext} from 'react';
import LandingHeaderStyles from './LandingHeader2.module.css';
import LandingHero from '../../Images/LandingMap.png'
import Resource1 from '../../Images/Resource1.png'
import Resource2 from '../../Images/Resource2.png'
import Resource3 from '../../Images/Resource3.png'
import Resource4 from '../../Images/Resource4.png'
import Linkedin from '../../Images/Linkedin.png'
import Facebook from '../../Images/Facebook.png'
import Instagram from '../../Images/Instagram.png'
import Contribute from '../../Images/Contribute.png'
import useLandingNewYorkButton from './useLandingNewYorkButton';
import { AppContext } from "../../Context/AppContext";
import LandingStories from "../LandingStories/LandingStories"


const LandingHeader2 = () => {
    const appContext = useContext(AppContext);
    const { goToMap } = useLandingNewYorkButton();
    return ( <div>
        <div className={LandingHeaderStyles.HeaderContainer}>
            <div className={LandingHeaderStyles.Header}>    
            <h2 className={LandingHeaderStyles.Logo}>Allied Voices</h2>
            <p className={LandingHeaderStyles.LogoAbout}>About Us</p>
            </div>
            <div className={LandingHeaderStyles.HeaderDiv}> 
         <div className={LandingHeaderStyles.HeaderLeft}>
             <h2 className={LandingHeaderStyles.HeaderTitle}>Navigate your racial landscape</h2>
             <p className={LandingHeaderStyles.HeaderPara}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p> 
             <button className={LandingHeaderStyles.HeaderBtn} onClick={goToMap}>
     <span> Check it out </span>
    </button>
             </div>
         <div className={LandingHeaderStyles.HeaderRight}>
         <img className={LandingHeaderStyles.Hero} src={LandingHero} alt="Landing Page Map"></img> 
        </div>
         </div>
        </div>
        <div className={LandingHeaderStyles.AllyContainer}>
        <h2 className={LandingHeaderStyles.AllyTitle}>Read stories of allyship</h2>
{appContext.voices.rows.length ? (
    appContext.voices.rows.map((voice, index) => (
        <LandingStories key={index}
        index={index}
        heading={voice.Name}
        />
    ))
    ) : (<div>No articles found</div>)}
        </div>
        <div className={LandingHeaderStyles.ContributeContainer}>
        <div className={LandingHeaderStyles.ContributeBox}>
        <div className={LandingHeaderStyles.ContributeBoxDiv}>
        <h2 className={LandingHeaderStyles.ContributeTitle}>Contribute your own story</h2>
        <p className={LandingHeaderStyles.ContributeDesc}>Join our community, and share your own story. </p>
        <button className={LandingHeaderStyles.ContributeBtn}>
     <span  className={LandingHeaderStyles.ContributeBtnText}>Contribute</span>
    </button>
    </div>
    <div className={LandingHeaderStyles.ContributeImgBox}>
             <img className={LandingHeaderStyles.ContributeImg} src={Contribute} alt="Contribute"></img>
             </div>     
             </div>
        </div>
        <div className={LandingHeaderStyles.ResourceContainer}> 
        <h2 className={LandingHeaderStyles.AllyTitle}>Access curated resources</h2>
        <div className={LandingHeaderStyles.ResourceBox}>
        <div className={LandingHeaderStyles.ResourceDiv}>
        <img className={LandingHeaderStyles.ResourceImg} src={Resource1} alt="Resource 1"></img> 
        <p className={LandingHeaderStyles.ResourceText}>How to report an AAPI hate crime online</p> 
        </div>
        <div className={LandingHeaderStyles.ResourceDiv}>
        <img className={LandingHeaderStyles.ResourceImg} src={Resource2} alt="Resource 2"></img> 
        <p className={LandingHeaderStyles.ResourceText}>How to respond to Anti-Asian / American harasssment when it happens to you </p> 
        </div>
        <div className={LandingHeaderStyles.ResourceDiv}>
        <img className={LandingHeaderStyles.ResourceImg} src={Resource3} alt="Resource 3"></img> 
        <p className={LandingHeaderStyles.ResourceText}>What to do when you overhear racist comments at work</p> 
        </div>
        <div className={LandingHeaderStyles.ResourceDiv}>
        <img className={LandingHeaderStyles.ResourceImg} src={Resource4} alt="Resource 4"></img> 
        <p className={LandingHeaderStyles.ResourceText}>Guide to bystander intervention</p> 
        </div>       
        </div>  
        </div>
        <div className={LandingHeaderStyles.Footer}> 
        <div className={LandingHeaderStyles.FooterAllied}>
        <p className={LandingHeaderStyles.FooterAlliedText}>ally@alliedvoices.org</p>
        </div>
        <div className={LandingHeaderStyles.FooterSocial}>
        <img className={LandingHeaderStyles.FooterImg} src={Linkedin} alt="Linkedin Image"></img>
        <img className={LandingHeaderStyles.FooterImg} src={Facebook} alt="Linkedin Image"></img> 
        <img className={LandingHeaderStyles.FooterImg} src={Instagram} alt="Linkedin Image"></img>  
        </div>
        </div>
        </div>
    )
}



export default LandingHeader2

