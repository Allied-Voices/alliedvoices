require('dotenv').config();

exports.handler = function (event, context, callback) {
  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );

  var data = {};
  data.rows = [];

  var locations = JSON.parse(event.queryStringParameters.locations);
  var filterString = '';
  locations.forEach((location, index) => {
    if (index !== 0) {
      filterString += ', ';
    }
    filterString += `FIND(LOWER('${location}'), LOWER({Location}))`;
  });
  filterString = `OR(${filterString})`;

  base('FINAL Resources')
    .select({
      filterByFormula: filterString,
      fields: ['URL', 'Title', 'Summary', 'Image', 'Tags', 'Location', 'Notes'],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          try {
            record.fields['Tags'].forEach((tag) => {
              if (!data[tag]) data[tag] = [];
              data[tag].push(data.rows.length);
            });
            data.rows.push(record.fields);
          } catch (err) {
            console.error(err);
          }
        });
        try {
          fetchNextPage();
        } catch {
          return;
        }
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data),
        });
      }
    );
  filterString = `OR(${filterString})`;

  base('Resources (for Live Site)')
    .select({
      filterByFormula: filterString,
      fields: [
        'Name',
        'Resource Owner',
        'Image',
        'URL',
        'Location Tags for Relevancy',
        'Tags for Relevancy',
      ],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          record.fields['Location Tags for Relevancy'].forEach((tag) => {
            if (!data[tag]) data[tag] = [];
            data[tag].push(data.rows.length);
          });
          data.rows.push(record.fields);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data),
        });
      }
    );
};
