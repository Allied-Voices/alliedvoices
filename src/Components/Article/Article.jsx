import React, { useContext }  from 'react';
import ArticleStyles from './Article.module.css'
import { AppContext } from '../../Context/AppContext'
import CloseIcon from '../CloseIcon/CloseIcon'
import Tag from '../Tag/Tag';
import { calculateDistance }  from '../../utils/distance'
import { calculateTimeSpan } from '../../utils/date'

const Article = () => {
  const appContext = useContext(AppContext);
  var article = appContext.voices.rows[appContext.selected];
  var resources = null;
  var relatedArticles = null;
  
  if(article && article['Location Tags for Resources']){
    resources = [];
    let resourceIndices = [];
    article['Location Tags for Resources'].forEach((location)=>{
      resourceIndices = [...resourceIndices, ...appContext['resources'][location]]
    });
    resourceIndices = new Set(resourceIndices);
    resourceIndices.forEach((index)=>{
      let resource = appContext.resources.rows[index];
      resources.push(<li><a href={resource.URL}>{resource.Name}</a></li>)
    })      
  }

  if(article && article['Incident type']){
    relatedArticles = [];
    let voiceIndices = [];
    article['Incident type'].forEach((incidentType)=>{
      voiceIndices = [...voiceIndices, ...appContext['voices'][incidentType]]
    });
    voiceIndices = new Set(voiceIndices);
    voiceIndices.forEach((index)=>{
      let relatedArticle = appContext.voices.rows[index];
      relatedArticles.push(<li><a href={relatedArticle.URL}>{relatedArticle.Name}</a></li>)
    })      
  }


  var articleClass;
  if (appContext.articleToggled){
    articleClass = ArticleStyles.Toggled
  }else{
    articleClass = ArticleStyles.Hidden
  }

  return ( 
    <div className={`${ArticleStyles.Container} ${articleClass}`}>
      <div className={ArticleStyles.HeadingContainer}>
        <h2 className={ArticleStyles.Title}>
          {article && article.Name}
        </h2>
        <div className={ArticleStyles.Close} onClick={appContext.closeArticle}><CloseIcon/></div>
      </div>
      <div className={ArticleStyles.SubheadingContainer}>
        <h3 className={ArticleStyles.Subtitle}>
          {article && calculateTimeSpan(article.Date)} · {article && calculateDistance(appContext.lat, appContext.lng, article.lat, article.lng)}
        </h3>
      </div>
      <div className={ArticleStyles.TagsContainer}>
        {(article && article['Incident type']) && article['Incident type'].map((label)=><Tag type='Incident'>{label}</Tag>)}
        {(article && article['Location Tags for Resources']) && article['Location Tags for Resources'].map((label)=><Tag type='Location'>{label}</Tag>)}
      </div>
      <div className={ArticleStyles.IframeContainer}>
        <h3>Read more at <span>{article && article.Publisher}</span></h3>
        <iframe className={ArticleStyles.Iframe} title={"Test Article"} src={article && article.URL}/>
      </div>
      <div className={ArticleStyles.RelatedStories}>
        <h2>Read related stories</h2>
        <ul>
          {relatedArticles}
        </ul>
      </div>
      <div className={ArticleStyles.Resources}>
        <h2>Resources</h2>
        <ul>
          {resources}
        </ul>
      </div>
    </div>
   );
}
 
export default Article;