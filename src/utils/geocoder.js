const BASE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const API_KEY = '&key=AIzaSyBjrzncwvY7Af3BhEwJpAqw_7rH7X6J7Gs'

async function getGeocodeInformationFor(location, cb) {
   const response = await fetch(BASE_API_URL + encodeURIComponent(location) + API_KEY, {
      methods: "GET",
   })

   // Example of API response from Geocode below 
   const responseData = await response.json();

   if(responseData.status === "OK"){

      // Grab the town, city, and state if available.
      let locations = [];
      responseData.results[0].address_components.forEach((address_component) => {
         if (address_component.types.includes('locality') || address_component.types.includes('administrative_area_level_1')) {
            locations.push(address_component.long_name)
         }
      })

      // Call callback or return values
      if (cb) {
         cb(
            {
            ...responseData.results[0].geometry.location,
            locations
            }
         )
      } else {
         return {
            ...responseData.results[0].geometry.location,
            locations
         }
      }
      
   }else{

      // Return null values
      return{
         lat:null,
         lng:null,
         locations:null
      }

   }
}

export { getGeocodeInformationFor }

// API Response
/*
{
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "1600",
               "short_name" : "1600",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Amphitheatre Parkway",
               "short_name" : "Amphitheatre Pkwy",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Mountain View",
               "short_name" : "Mountain View",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Santa Clara County",
               "short_name" : "Santa Clara County",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "California",
               "short_name" : "CA",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "94043",
               "short_name" : "94043",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
         "geometry" : {
            "location" : {
               "lat" : 37.4267861,
               "lng" : -122.0806032
            },
            "location_type" : "ROOFTOP",
            "viewport" : {
               "northeast" : {
                  "lat" : 37.4281350802915,
                  "lng" : -122.0792542197085
               },
               "southwest" : {
                  "lat" : 37.4254371197085,
                  "lng" : -122.0819521802915
               }
            }
         },
         "place_id" : "ChIJtYuu0V25j4ARwu5e4wwRYgE",
         "plus_code" : {
            "compound_code" : "CWC8+R3 Mountain View, California, United States",
            "global_code" : "849VCWC8+R3"
         },
         "types" : [ "street_address" ]
      }
   ],
   "status" : "OK"
}
*/