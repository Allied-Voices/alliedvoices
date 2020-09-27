var BASE_URL = 'https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3'

if (process.env.NODE_ENV === "production") {
  BASE_URL = 'https://ipinfo.io?token=c61770f410d81b'
}

async function getLocation(cb) {
  const response = await fetch(BASE_URL, {
    method: "GET"
  })
  const responseData = await response.json();
  if (cb) {
    cb()
  } else {
    if (process.env.NODE_ENV === "production") {
      let coordinates = responseData.loc.split(',')
      return { lat: coordinates[0], lng: coordinates[1], locations: [responseData.city, responseData.region] }
    }
    return { lat: responseData.latitude, lng: responseData.longitude, locations: [responseData.city, responseData.state] }
  }
}

export { getLocation }