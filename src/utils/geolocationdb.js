// const BASE_GEOLOCATIONDB_URL = 'https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3'
const BASE_IPSTACK_URL = ".netlify/functions/Geolocation"
// const BASE_IP_API_URL = 'http://ip-api.com/json/'
const BASE_IP_INFO_URL = 'https://ipinfo.io?token=c61770f410d81b'

async function getLocation(cb) {
  const response = await fetch(BASE_IP_INFO_URL, {
    method: "GET"
  })
  const responseData = await response.json();
  console.log(responseData)
  if (cb) {
    cb()
  } else {
    // return { lat: responseData.latitude, lng: responseData.longitude, locations: [responseData.city, responseData.state] }
    // return { lat: responseData.latitude, lng: responseData.longitude, locations: [responseData.city, responseData.region_name] }
    let coordinates = responseData.loc.split(',')
    return { lat: coordinates[0], lng: coordinates[1], locations: [responseData.city, responseData.region] }
  }
}

export { getLocation }

// Current Return {"country_code":"CA","country_name":"Canada","city":"Toronto","postal":"M4Y","latitude":43.6656,"longitude":-79.383,"IPv4":"173.230.164.131","state":"Ontario"}
// http://api.ipstack.com/192.0.220.27?access_key=57446b31f0542d8a57eb435a164eab43 --> Try this out