require('dotenv').config()

exports.handler = function (event, context, callback) {
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

  const {lat, lng, pageNum, search, ...filterOptions} = event.queryStringParameters;

  var filterString = 'AND('

  if(search){
    let searchValue = JSON.parse(search)[0];
    filterString += 'OR('
    filterString += `FIND("${searchValue}", {Name}), 
      FIND("${searchValue}", {Type}), 
      FIND("${searchValue}", {Severity}), 
      FIND("${searchValue}", {Incident type}), 
      FIND("${searchValue}", {Race}), 
      FIND("${searchValue}", {Type}), 
      FIND("${searchValue}", {Location Tags})), `
  }else if(filterOptions){
    let filterKeys = Object.keys(filterOptions);
    filterKeys.forEach(key => {
      let filterStringForKey = 'OR(';
      let filterOptionsForKey = JSON.parse(filterOptions[key]);
      filterOptionsForKey.forEach((filterOption, index)=>{
        if(index !== 0){
          filterStringForKey += ', '
        }
        filterStringForKey += `FIND("${filterOption}", {${key}})`;
      })
      filterStringForKey += '), ';
      filterString += filterStringForKey;
    })
  }

  filterString += `lat > ${parseFloat(event.queryStringParameters.lat) - 0.5}, lat < ${parseFloat(event.queryStringParameters.lat) + 0.5},
                      lng > ${parseFloat(event.queryStringParameters.lng) - 0.5}, lng < ${parseFloat(event.queryStringParameters.lng) + 0.5})`

  var data = { articles: {} };
  data.articles.rows = [];

  var startingArticleNum = -10 + 10*(pageNum);
  var endingArticleNum = startingArticleNum + 10;
  var articleNum = 0;

  base('Articles').select({

    filterByFormula: filterString,
    fields: ["Name", "lat", "lng", "Date", "Type", "Incident type", "Incident type copy", "Publisher", "URL", "Snippet", "Location Tags"],
    view: "All users"

  }).eachPage(function page(records, fetchNextPage) {
    
    records.forEach(function (record) {

      if(articleNum >= startingArticleNum && articleNum <= endingArticleNum){
        if (record.fields['Incident type']) {
          record.fields['Incident type'].forEach((type) => {
            if (!data.articles[type]) data.articles[type] = [];
            data.articles[type].push(data.articles.rows.length);
          })
        }

        data.articles.rows.push(record.fields);
      }

      articleNum++;

    });

    fetchNextPage();

  }, function done(err) {

    if (err) { console.error(err); return; }

    data.totalPages = articleNum % 10 === 0 ? (articleNum/10) : Math.floor(articleNum/10) + 1;

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    });

  });

}