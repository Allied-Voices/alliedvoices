import React, { useContext } from "react";
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
        key={voice.id}
        index={index}
        heading={voice.Name}
        date={voice.Date}
        lat={voice.lat}
        lng={voice.lng}
        publisher={voice.Publisher}
        type={voice.Type}
        onClick={() => {
          // Some spagetti code here :)
          if(window.innerWidth<721){
            
              if(!appContext.articleFirstClick&&!appContext.articleSecondClick){
                return appContext.firstClickArticle(voice.id) 
              }
              else if(appContext.articleFirstClick &&voice.id === appContext.articleSelected){
                
                return appContext.secondClickArticle()
              }
              else if(!appContext.articleFirstClick &&voice.id === appContext.articleSelected){
                return appContext.secondClickArticle()
              }
              else{
                return appContext.firstClickArticle(voice.id) 
              }
            
          }
          else{
           
            return appContext.selectArticle(voice.id)
          }
        }}
        //onClick={() => appContext.selectArticle(voice.id)}
        selected={voice.id === appContext.articleSelected}
      />
    ))
  )
  
  const renderSections = (voices) => {
    if (voices.length) {
      // j is the index of the first article that was published more than a week ago
      const olderThan7Days = (voice) => {
        let diff = Date.now() - Date.parse(voice.Date);
        // 7 d = 604800000 ms
        return diff > 604800000;
      };
      let j = voices.findIndex(olderThan7Days);
      let firstOlderArticleId = null;
      if (j === -1) {
        return (
          <div className={SideBarStyles.Header}>
            <h2>Past 7 Days</h2>
            {renderArticles(voices)}
          </div>
        );
      } else if (j > 0) {
        firstOlderArticleId = voices[j].id;
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
            <div className={SideBarStyles.Header}>
            {!firstOlderArticleId || firstOlderArticleId !== voices[0].id ? null : <h2>More Stories</h2>}
            {renderArticles(voices)}
          </div>
          );
        }
    } else {
      return (
        <div>Loading articles...</div>
      );
    }
  };

  return (
    <div className={SideBarStyles.Container}>
      <div className={SideBarStyles.ArticleSection}>
        {renderSections(appContext.voices.rows)}
       
      </div>
      { !!appContext.maxPageNum && 
        <div className={SideBarStyles.PageSection}>
          {renderPagination(appContext.pageNum, appContext.maxPageNum, appContext.selectPage, appContext.goToPrevPage, appContext.goToNextPage)}
        </div>
        }
    </div>
  );
};

export default SideBar;
