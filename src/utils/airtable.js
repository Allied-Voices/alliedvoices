const BASE_URL = ".netlify/functions"

async function getVoices(lat, lng, cb) {
  const ATresponse = await fetch(BASE_URL + `/Articles?lat=${lat}&lng=${lng}`, {
    methods: "GET",
  })
  const ATresponseData = await ATresponse.json();

  if (cb) {
    cb(ATresponseData)
  } else {
    return ATresponseData
  }
}

async function getResources(locations, cb) {
  let parameters = JSON.stringify(locations)
  const ATresponse = await fetch(BASE_URL + `/Resources?locations=${parameters}`, {
    methods: "GET",
  })
  const ATresponseData = await ATresponse.json();

  if (cb) {
    cb(ATresponseData)
  } else {
    return ATresponseData
  }
}

export { getVoices, getResources }