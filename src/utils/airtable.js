const BASE_URL = ".netlify/functions"

async function getVoices(lat, lng, ...args) {
  let cb;
  let filterOptions;

  args.forEach((arg)=>{
    if(typeof arg === "function"){
      cb = arg;
    }

    if(typeof arg === "object"){
      filterOptions = arg;
    }
  })

  let query = `?lat=${lat}&lng=${lng}`

  if(filterOptions){
    let filterKeys = Object.keys(filterOptions);
    filterKeys.forEach((key)=>{
      query += `&${key}=` + JSON.stringify(filterOptions[key]);
    });
  }

  const ATresponse = await fetch(BASE_URL + `/Articles` + query, {
    methods: "GET",
  });
  const ATresponseData = await ATresponse.json();

  if (cb) {
    cb(ATresponseData);
  } else {
    return ATresponseData;
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