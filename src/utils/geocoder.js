const BASE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const API_KEY = '&key=AIzaSyBjrzncwvY7Af3BhEwJpAqw_7rH7X6J7Gs'

async function getCoordinatesFor(location) {
  const response = await fetch(BASE_API_URL + encodeURIComponent(location) + API_KEY, {
    methods: "GET",
  })
  const responseData = await response.json();
  return responseData.results[0].geometry.location
}

export { getCoordinatesFor }