require('dotenv').config()

exports.handler = function (event, context, callback) {
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

  const {lat, lng, ...filterOptions} = event.queryStringParameters;

  var filterString = 'AND('

  if(filterOptions){
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

  console.log(filterString);

  var data = {};
  data.rows = [];

  base('Articles').select({
    filterByFormula: filterString,
    fields: ["Name", "lat", "lng", "Date", "Type", "Incident type", "Incident type copy", "Publisher", "URL", "Snippet", "Location Tags"],
    view: "All users"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
      if (record.fields['Incident type']) {
        record.fields['Incident type'].forEach((type) => {
          if (!data[type]) data[type] = [];
          data[type].push(data.rows.length)
        })
      }
      data.rows.push(record.fields)
    });
    fetchNextPage();
  }, function done(err) {
    if (err) { console.error(err); return; }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data)
    });
  });
}