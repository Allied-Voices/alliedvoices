const BASE_URL = ".netlify/functions/Articles?"

async function getVoices(lat, lng) {
  const ATresponse = await fetch(BASE_URL + `lat=${lat}&lng=${lng}`, {
    methods: "GET",
  })
  const ATresponseData = await ATresponse.json();
  return ATresponseData
}

export { getVoices }