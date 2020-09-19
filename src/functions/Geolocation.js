require('dotenv').config()
const axios = require('axios');

const BASE_IPSTACK_URL = "http://api.ipstack.com/192.0.220.27?access_key=" + process.env.IPSTACK_API_KEY;
const BASE_IPDATA_URL = "https://api.ipdata.co?api-key=" + process.env.IPDATA_API_KEY + "&fields=city,region,longitude,latitude"

exports.handler = async function getLocation(event, context, callback) {
  try {
    const response = await axios.get(BASE_IPDATA_URL)
    console.log(response)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      body: JSON.stringify(error)
    });
  }


}