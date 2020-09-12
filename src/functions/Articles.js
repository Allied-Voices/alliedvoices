require('dotenv').config()

exports.handler = function (event, context, callback) {
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

  var data = [];

  var filterString = `AND(lat > ${parseFloat(event.queryStringParameters.lat) - 0.5}, lat < ${parseFloat(event.queryStringParameters.lat) + 0.5},
                      lng > ${parseFloat(event.queryStringParameters.lng) - 0.5}, lng < ${parseFloat(event.queryStringParameters.lng) + 0.5})`

  base('Articles').select({
    filterByFormula: filterString,
    fields: ["Name", "lat", "lng", "Date", "Type", "Incident type copy", "Publisher", "URL", "Snippet", "Location tags for Resources"],
    view: "All users"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
      data.push(record.fields)
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