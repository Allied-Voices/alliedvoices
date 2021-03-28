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

  const numberOfPages = (selectedPage, maxPage, onClick) => {
    let numbers = [];
    let lastPageToDisplay;
    let startingPage;

    if (maxPage === 0 ) return numbers;

    if(selectedPage < 3) {
      startingPage = 1;
      if(maxPage < 5){
        lastPageToDisplay = maxPage
      } else {
        lastPageToDisplay = 5;
      }
    } else if(selectedPage > (maxPage - 3)) {
      startingPage = maxPage-4;
      lastPageToDisplay = maxPage;
    } else {
      startingPage = selectedPage-2;
      lastPageToDisplay = selectedPage+2;
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

  return (
    <div className={SideBarStyles.Container}>
      <div className={SideBarStyles.Header}>
        <Link to="/">
          <Logo primary width="42" height="40" />
          <h3>Allied Voices</h3>
        </Link>
      </div>
      <div className={SideBarStyles.SearchSection}>
        <Search placeholder={'Search for Voices'} filterFunction={appContext.filterVoices}/>
      </div>
      <div className={SideBarStyles.FilterSection}>
        <ButtonMenu
          buttonLabel={"Location"}
          includeSearch={true}
          searchTitle="See Voices from a different location"
          searchPlaceholder="Enter location here"
          searchFunction={appContext.updateLocation}
          optionsTitle="Select location type here"
          options={[
            "Public Space",
            "Commute",
            "Workplace",
            "Home",
            "Place of Worship",
            "Online",
          ]}
          filterFunction={appContext.filterVoices}
          clearFunction={appContext.clearVoices}
          filterKey="Location Tags"
        />
        <ButtonMenu
          buttonLabel="Type"
          optionsTitle="Filter by Content Type"
          options={["Race-related incident", "Opinion", "Good deed"]}
          filterFunction={appContext.filterVoices}
          clearFunction={appContext.clearVoices}
          filterKey="Type"
        />
        <ButtonMenu
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
        />
        <ButtonMenu
          buttonLabel="Incident Tags"
          optionsTitle="Filter by Incident Tags"
          options={["Physical", "Verbal", "Vandalism"]}
          filterFunction={appContext.filterVoices}
          clearFunction={appContext.clearVoices}
          filterKey="Incident type"
        />
        <ButtonMenu
          buttonLabel="Race"
          optionsTitle="Filter by Race"
          options={["Asian", "Black"]}
          filterFunction={appContext.filterVoices}
          clearFunction={appContext.clearVoices}
          filterKey="Race"
        />
      </div>
      <div className={SideBarStyles.ArticleSection}>
        {appContext.voices.rows.length ? (
          appContext.voices.rows.map((voice, index) => (
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
              selected={index === appContext.selected}
            />
          ))
        ) : (
          <div>There are no records of articles</div>
        )}
      </div>
      { !!appContext.maxPageNum && 
        <div className={SideBarStyles.PageSection}>
            <span className={appContext.pageNum === 1 ? SideBarStyles.Disabled : "" } onClick={appContext.goToPrevPage}>&lt;  Prev</span>
            {numberOfPages(appContext.pageNum, appContext.maxPageNum, appContext.selectPage)}
            <span className={appContext.pageNum === appContext.maxPageNum ? SideBarStyles.Disabled : "" } onClick={appContext.goToNextPage}>Next  &gt;</span>
        </div>
      }
    </div>
  );
};

export default SideBar;
