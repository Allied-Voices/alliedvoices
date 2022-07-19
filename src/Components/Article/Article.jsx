import React, { useContext } from "react";
import ArticleStyles from "./Article.module.css";
import { AppContext } from "../../Context/AppContext";
import CloseIcon from "../CloseIcon/CloseIcon";
import ArticleImage from "../ArticleImage/ArticleImage";
import useDistMsgCreator from "../../CustomHooks/use-dist-msg-creator";
import { calculateTimeSpan } from "../../utils/date";
import ArticleResourceTile from "../ArticleResourceTile/ArticleResourceTile";

const Article = () => {
  const appContext = useContext(AppContext);
  var article =
    appContext.articleSelected !== -1
      ? appContext.voices.rows.find(
          (voice) => voice.id === appContext.articleSelected
        )
      : null;
  const { createDistMsg } = useDistMsgCreator();
  const distanceMsg =
    article &&
    createDistMsg(
      appContext.orgLat,
      appContext.orgLng,
      article.lat,
      article.lng
    );
  var resources = null;
  var articleSelectedTags = [];
  var airtableTags = ["Type", "Race", "Location Tags", "Incident Type"];

  if (article /*&& article['Incident Type']*/) {
    airtableTags.forEach((tag) => {
      if (article[tag]) {
        // if there is more than one tag, we need to convert it to strings for saving inside the array
        if (article[tag]) {
          // if there is more than one tag, we need to convert it to strings for saving inside the array
          Array.isArray(article[tag])
            ? articleSelectedTags.push(...article[tag])
            : articleSelectedTags.push(article[tag]);
        }
      }
    });
    // Convert some tags

    articleSelectedTags = articleSelectedTags.map((element) => {
      if (element === "Physical") {
        return "Macroaggression";
      } else if (element === "Verbal") {
        return "Microaggression";
      } else return element;
    });

    // If there are related resources
    let resourceIndices = [];
    articleSelectedTags.forEach((tags) => {
      if (appContext["resources"][tags]) {
        function shuffle(array) {
          let currentIndex = array.length,
            randomIndex;

          // While there remain elements to shuffle...
          while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
              array[randomIndex],
              array[currentIndex],
            ];
          }

          return array;
        }

        resourceIndices = shuffle([
          ...resourceIndices,
          ...appContext["resources"][tags],
        ]).slice(0, 2);
      }
    });

    // If there are not related resources
    /*if (resourceIndices.length < 2) {
      let n = Object.keys(appContext["resources"]);
      let n1 = Math.floor(Math.random() * n.length);
      let n2 = Math.floor(Math.random() * n.length);
      while (n1 === n2) {
        n2 = Math.floor(Math.random() * n.length);
      }
      resourceIndices = [n1, n2];
    }*/

    resourceIndices = new Set(resourceIndices);
    if (resourceIndices.size) {
      resources = [];
      resourceIndices.forEach((index) => {
        let resource = appContext.resources.rows[index];

        resources.push(<ArticleResourceTile resource={resource} key={index} />);
      });
    }
  }
  // Responsive Article classing
  let articleClass;

  if (window.innerWidth < 1281) {
    if (appContext.articleToggled) {
      if (appContext.articleSecondClick) {
        articleClass = ArticleStyles.Toggled;
        appContext.articleSecondClick = false;
        appContext.articleFirstClick = false;
      } else {
        articleClass = ArticleStyles.Hidden;
        console.log(appContext.articleSecondClick);
      }
    } else {
      articleClass = ArticleStyles.Hidden;
    }
  } else {
    articleClass = appContext.articleToggled
      ? ArticleStyles.Toggled
      : ArticleStyles.Hidden;
  }

  /////
  return (
    <div className={`${ArticleStyles.Container} ${articleClass}`}>
      {article && (
        <div className={ArticleStyles.ArticleContainer}>
          <div className={ArticleStyles.HeadingContainer}>
            <h2 className={ArticleStyles.Title}>{article.Name}</h2>
            <div
              className={ArticleStyles.Close}
              onClick={appContext.closeArticle}
            >
              <CloseIcon />
            </div>
          </div>
          <div className={ArticleStyles.SubheadingContainer}>
            <h3 className={ArticleStyles.Subtitle}>
              {calculateTimeSpan(article.Date)}
              {distanceMsg && " ·  " + distanceMsg}
            </h3>
          </div>
          {/* <div className={ArticleStyles.TagsContainer}>
            {(article['Incident Type']) && article['Incident Type'].map((label)=><Tag key={label} type='Incident'>{label}</Tag>)}
            {(article['Location Tags']) && article['Location Tags'].map((label)=><Tag key={label} type='Location'>{label}</Tag>)}
          </div> */}
          <div className={ArticleStyles.ImageContainer}>
            <ArticleImage imageUrl={article.Image}></ArticleImage>
          </div>
          <div className={ArticleStyles.SummaryContainer}>
            <p>{article["Summary"]}</p>
            <h3>
              <a href={article.URL} rel="noopener noreferrer" target="_blank">
                Read more on {article.Publisher}
              </a>
            </h3>
          </div>
          {!!resources && (
            <div className={ArticleStyles.Resources}>
              <h2>Resources</h2>
              <ul>{resources}</ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Article;
