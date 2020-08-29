require('dotenv').config()

exports.handler = function (event, context, callback) {
  var Airtable = require('airtable');
  console.log(event);
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

  var data = [];

  var filterString = `AND(LATITUDE > ${parseFloat(event.queryStringParameters.lat) - 0.5}, LATITUDE < ${parseFloat(event.queryStringParameters.lat) + 0.5},
                      LONGITUDE > ${parseFloat(event.queryStringParameters.lng) - 0.5}, LONGITUDE < ${parseFloat(event.queryStringParameters.lng) + 0.5})`
  console.log(filterString)

  base('Articles').select({
    // Selecting the first 3 records in All users:
    filterByFormula: filterString,
    view: "All users"
  }).eachPage(function page(records, fetchNextPage) {
    records.forEach(function (record) {
      data.push(record.get('Name'))
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