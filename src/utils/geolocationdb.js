const BASE_URL = 'https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3'

async function getLocation() {
  const response = await fetch(BASE_URL, {
    method: "GET"
  })
  const responseData = await response.json();
  return { lat: responseData.latitude, lng: responseData.longitude }
}

export { getLocation }