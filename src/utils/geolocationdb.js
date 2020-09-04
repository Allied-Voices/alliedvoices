const BASE_URL = 'https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3'

async function getLocation(cb) {
  const response = await fetch(BASE_URL, {
    method: "GET"
  })
  const responseData = await response.json();

  if (cb) {
    cb()
  } else {
    return { lat: responseData.latitude, lng: responseData.longitude, locations: [responseData.city, responseData.state] }
  }
}

export { getLocation }

// Current Return {"country_code":"CA","country_name":"Canada","city":"Toronto","postal":"M4Y","latitude":43.6656,"longitude":-79.383,"IPv4":"173.230.164.131","state":"Ontario"}