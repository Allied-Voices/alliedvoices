require("dotenv").config();

exports.handler = function (event, context, callback) {
  var Airtable = require("airtable");
  var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );

  var data = {};
  data.rows = [];

  var filterString = "";

  base("Articles")
    .select({
      filterByFormula: filterString,
      fields: ["Name", "Publisher", "URL", "Summary", "Image", "Type"],
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          try {
            // record.fields['Name'].forEach((tag) => {
            //   if (!data[tag]) data[tag] = [];
            //   data[tag].push(data.rows.length);
            // });
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
};
