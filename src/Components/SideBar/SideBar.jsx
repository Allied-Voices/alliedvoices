import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Search from "../Search/Search";
import ButtonMenu from "../ButtonMenu/ButtonMenu";
import { AppContext } from "../../Context/AppContext";
import SideBarArticle from "../SideBarArticle/SideBarArticle";
import SideBarStyles from "./SideBar.module.css";

const SideBar = () => {
  const appContext = useContext(AppContext);

  const createPageNumbers = (selectedPage, maxPage, onClick) => {
    let numbers = [];
    let lastPageToDisplay;
    let startingPage;

    if (maxPage === 0 ) return numbers;

    if(maxPage <= 5) {
      startingPage = 1;
      lastPageToDisplay = maxPage;
    }else{
      if(selectedPage < 3){
        startingPage = 1;
        lastPageToDisplay = 5;
      }
      else if(selectedPage >= 3 && selectedPage <= (maxPage - 3)){
        startingPage = selectedPage - 2;
        lastPageToDisplay = selectedPage + 2;
      }else{
        startingPage = maxPage - 4;
        lastPageToDisplay = maxPage;
      }
    }

    for(let i = startingPage; i<=lastPageToDisplay; i++){
      if(i===selectedPage){
        numbers.push(
          <span key={i} className={SideBarStyles.Selected} >{i}</span>
        )
      }else{
        numbers.push(
          <span key={i} onClick={()=>{onClick(i)}}>{i}</span>
        )
      }
    }
    return numbers;
  };

  const renderPagination = (selectedPage, maxPage, selectPage, onClickPrevPage, onClickNextPage) => {
    return (
      <>
        <span className={selectedPage === 1 ? SideBarStyles.Disabled : "" } onClick={onClickPrevPage}>&lt;  Prev</span>
          {createPageNumbers(selectedPage, maxPage, selectPage)}
        <span className={selectedPage === maxPage ? SideBarStyles.Disabled : "" } onClick={onClickNextPage}>Next  &gt;</span>
      </>
    );
  };

  const renderArticles = (voices) => (
    voices.map((voice, index) => (
      <SideBarArticle
        key={index}
        index={index}
        heading={voice.Name}
        date={voice.Date}
        lat={voice.lat}
        lng={voice.lng}
        publisher={voice.Publisher}
        type={voice.Type}
        onClick={() => appContext.selectArticle(index)}
        selected={index === appContext.articleSelected}
      />
    ))
  )
  
  const renderSections = (voices) => {
    if (voices.length) {
      // j is the index of the first article that was published more than a week ago
      let j = 0;
      for (let i = 0; i < voices.length; i++) {
        let diff = Date.now() - Date.parse(voices[i].Date);
        // 7 d = 604800000 ms
        if (diff > 604800000) {
          j = i;
          break;
        }
      }
      if (j === 0) {
        return (
          renderArticles(voices)
        );
      } else {
        if (appContext.pageNum === 1) {
          return (
            <div>
              <div className={SideBarStyles.Header}>
                <h2>Past 7 Days</h2>
                {renderArticles(voices.slice(0, j))}
              </div>
              <div className={SideBarStyles.Header}>
                <h2>More Stories</h2>
                {renderArticles(voices.slice(j))}
              </div>
            </div>
          );
        } else {
          return (
            renderArticles(voices)
          );
        }
      }
    } else {
      return (
        <div>Loading articles...</div>
      );
    }
  };

  return (
    <div className={SideBarStyles.Container}>
      <div className={SideBarStyles.Header}>
        <Link to="/">
          <Logo primary width="42" height="40" />
          <h3>Allied Voices</h3>
        </Link>
      </div>
      <div className={SideBarStyles.SearchSection}>
        <Search placeholder={'Find voices in your area'} searchFunction={appContext.updateLocation}/>
      </div>
      <div className={SideBarStyles.ArticleSection}>
        <div className={SideBarStyles.FilterSection}>
          <ButtonMenu
            buttonLabel="Content Type"
            optionsTitle="Filter by Content Type"
            options={["Incidents", "Acts of Allyship", "Stories of Empowerment", "General News", "Resources"]}
            filterFunction={appContext.filterVoices}
            clearFunction={appContext.clearVoices}
            filterKey="Type"
          />
          {/* <ButtonMenu
            buttonLabel="Source"
            optionsTitle="Filter by Source"
            options={[
              "News",
              "Reporting Center",
              "Social Media",
              "User Submissions",
            ]}
            filterFunction={appContext.filterVoices}
            clearFunction={appContext.clearVoices}
            filterKey="Content Type"
          /> */}
          {/* <ButtonMenu
            buttonLabel="Incident Tags"
            optionsTitle="Filter by Incident Tags"
            options={["Physical", "Verbal", "Vandalism"]}
            filterFunction={appContext.filterVoices}
            clearFunction={appContext.clearVoices}
            filterKey="Incident type"
          /> */}
          {/* <ButtonMenu
            buttonLabel="Race"
            optionsTitle="Filter by Race"
            options={["Asian", "Black"]}
            filterFunction={appContext.filterVoices}
            clearFunction={appContext.clearVoices}
            filterKey="Race"
          /> */}
        </div>
        {renderSections(appContext.voices.rows)}
        { !!appContext.maxPageNum && 
        <div className={SideBarStyles.PageSection}>
          {renderPagination(appContext.pageNum, appContext.maxPageNum, appContext.selectPage, appContext.goToPrevPage, appContext.goToNextPage)}
        </div>
        }
      </div>
    </div>
  );
};

export default SideBar;
