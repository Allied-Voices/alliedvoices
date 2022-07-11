from GoogleNews import GoogleNews
import newspaper
from datetime import datetime
from x_classikeep import main
from spacystanza import loop_articles
from newspaper import Article
from newspaper import Config
import pandas as pd
import nltk
from datetime import date, timedelta
from pygooglenews import GoogleNews as pygo


today = date.today()
yesterday = (today - timedelta(days=1))

#INPUT VALUES: todayandyesterday = "on" for articles from today and yesterday// test = "on" for testing

todayandyesterday = ""

test = ""

#######################################################################################################

if todayandyesterday == "":
    startm = '06'
    year = '2022'
    start = f'{startm}-18'
    end = '06-27'
    #end = f'{startm}-17'
    startd = year + "-" + start
    endd = year + "-" + end

    start_fs = start.replace("-",",")
    end_fs = end.replace("-",",")


if todayandyesterday == "on":
    start = yesterday.strftime('20%y/%m/%d')
    end = today.strftime('20%y/%m/%d')
    startd = start.replace("/","-")
    endd = end.replace("/","-")
    startmd = yesterday.strftime('%m/%d')
    endmd = today.strftime('%m/%d')
    start_fs = startmd.replace("/",",")
    end_fs = endmd.replace("/",",")
    year = today.year

if test == "":
    keywords = ['anti asian + new york', 'anti asian + harlem','anti asian + manhattan','anti asian + staten island','anti asian + brooklyn', 'anti asian + queens', 'hate crime + harlem','hate crime + manhattan','hate crime + staten island','hate crime + brooklyn', 'hate crime + queens','racism  + harlem','racism  + manhattan','hate crime + staten island','racism  + brooklyn', 'racism + queens']
    

if test == "on":
    keywords = ['racism + new york city']
    num = 1


#refer to : https://medium.com/analytics-vidhya/googlenews-api-live-news-from-google-news-using-python-b50272f0a8f0

#nltk.download('punkt')

user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
config = Config()
config.browser_user_agent = user_agent



#print(end_fs)
#googlenews=GoogleNews(period='1d')


#googlenews=GoogleNews(start='01/01/2021',end='01/23/2021')

googlenews=pygo('en', 'US')
 
l = []

for keyword in keywords:
    results = googlenews.search(keyword, from_=f'{startd}', to_=f'{endd}')
    #df=pd.DataFrame(results['entries'])
    #print("HELLO", df.head())
    #print(keyword)

    entries = results['entries']
    #df = df.iloc[0:2]  
    
    for entry in entries:
        link = entry['link']
    
        article = Article(link)
        try:
            article.download()
            article.parse()
            article.nlp()
            d = {}
            
            d['Keyword']= keyword
            d['Link']= link
            d['Media'] = entry['source']['title']
            d['Datetime']= entry['published']
            d['Title']= entry['title']
            d['article_text']=article.text
            d['Summary']=article.summary
            
            print("AT",article.text)
            
            l.append(d)

        except newspaper.article.ArticleException:
        
            pass

        
        
       
        
        

news_df=pd.DataFrame(l)

#location_df = loop_articles(news_df)
#location_df = location_df.sort_values("Title")



#print(location_df)
#print(news_df['Keyword'])
news_df = main(news_df)
news_df = news_df.sort_values('k-l', ascending=False)
#nnews_df = news_df.merge(location_df, on='Title', how='left')
nnews_df = news_df.drop_duplicates(subset= 'Title', keep='first')
#classification_df = nnews_df[['Title','article_text', 'keyword', 'content type','community', 'location tags','incident type']]
validation_df = nnews_df[['Title','article_text', 'k-l', 'keep', 'nokeep']]
validation_df = validation_df.sort_values('k-l', ascending=False)
forkeep_df = nnews_df[['Title','Media','Datetime', 'Summary','article_text', 'Link','k-l','nyc_nbh','nyc_st','nysubway']]


#for Title
titleqkeep_df = nnews_df[['Title','article_text', 'title-k-l', 'nyc_nbh','nyc_st', 'nysubway']]
titleqkeep_df = titleqkeep_df.sort_values('title-k-l', ascending=False)
title_keep_df = titleqkeep_df[titleqkeep_df['title-k-l'] > 5]

artsqtokeep_df = nnews_df[['Title','Media','Datetime', 'Summary','article_text', 'Link', 'nyc_nbh','nyc_st', 'nysubway','title-k-l','k-l']]
artstokeep_df = artsqtokeep_df[artsqtokeep_df['title-k-l'] > 5]
artstokeep_df = artstokeep_df[artstokeep_df['k-l'] > 20]
artstokeep_df = artstokeep_df[['Link','Media','Datetime','Title','article_text', 'Summary', 'nyc_nbh','nyc_st', 'nysubway']]

keepq_df = forkeep_df[forkeep_df['k-l'] > 20]
nyinfo_df = keepq_df[['Title','article_text','nyc_nbh','nyc_st', 'nysubway']]

keep_df = keepq_df[['Link','Media','Datetime','Title','article_text', 'Summary', 'k-l']]



#filter = classification_df["keyword"] != ""
#classvali_df= classification_df[filter]

#nnews_df.to_excel(f'/Users/lzc/AV/articles/articles_folder/{start_fs}_{end_fs}_{year}.xlsx', index=False)
#news_df.to_excel(f'{start_fs}_{end_fs}_{year}.xlsx', index=False)
#nnews_df.to_excel('test.xlsx', index=False)

if test == "on":
    with pd.ExcelWriter(f'/Users/lzc/AV/articles/articles_folder/test.xlsx') as writer:  
        artstokeep_df.to_excel(writer, sheet_name = 'artstokeep')
        keep_df.to_excel(writer, sheet_name='Keep')
        title_keep_df.to_excel(writer, sheet_name = 'title keep')
        nyinfo_df.to_excel(writer, sheet_name = 'NY')
        nnews_df.to_excel(writer, sheet_name='Everything')
        validation_df.to_excel(writer, sheet_name = 'Validation')
        #classification_df.to_excel(writer, sheet_name='Classifications')
        #location_df.to_excel(writer, sheet_name='Locations')
        #classvali_df.to_excel(writer, sheet_name = 'only KEY')
        print('test.xlsx')

if test == "":
    with pd.ExcelWriter(f'/Users/lzc/AV/articles/articles_folder/{start_fs}to{end_fs}_{year}py.xlsx') as writer:  
        
        artstokeep_df.to_excel(writer, sheet_name = 'artstokeep')
        keep_df.to_excel(writer, sheet_name='Keep')
        title_keep_df.to_excel(writer, sheet_name = 'title keep')
        nyinfo_df.to_excel(writer, sheet_name = 'NY')
        nnews_df.to_excel(writer, sheet_name='Everything')
        validation_df.to_excel(writer, sheet_name = 'Validation')
        #classification_df.to_excel(writer, sheet_name='Classifications')
        #location_df.to_excel(writer, sheet_name='Locations')
        #classvali_df.to_excel(writer, sheet_name = 'only KEY')
        print(f'{start_fs}to{end_fs}_{year}.xlsx')


