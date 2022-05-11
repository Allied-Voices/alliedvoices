require('dotenv').config();

const axios = require('axios');

exports.handler = async function (event) {

	let location = event.body;
	
	let url;

	const BASE_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
	
	if (typeof(location) === 'string') {

		url = BASE_API_URL + 'address=' + encodeURIComponent(location) + '&key=' + process.env.GEOCODING_API_KEY;
		
	} else {
		
		url = BASE_API_URL + 'latlng=' + location.lat + ',' + location.lng + '&key=' + process.env.GEOCODING_API_KEY;
	
	}

	let res = await axios(url);

	/*

	https://axios-http.com/docs/res_schema

	https://developers.google.com/maps/documentation/geocoding/requests-geocoding#GeocodingResponses

	*/

	if (res.data.status === 'OK') {

		let locations = [];

		res.data.results[0].address_components.forEach((address_component) => {
			if (address_component.types.includes('locality') || address_component.types.includes('administrative_area_level_1')) {
				locations.push(address_component.long_name);
			}
		});

		if (typeof(location) === 'string') {

			return {
				statusCode: 200,
				body: JSON.stringify({
					...res.data.results[0].geometry.location,
					locations,
					locationType: res.data.results[0].types[0]
				})
			};

		} else {

			return {
				statusCode: 200,
				body: JSON.stringify({
					lat: location.lat,
					lng: location.lng,
					locations,
					locationType: res.data.results[0].types[0]
				})
			};

		}

	} else {

		return {
			statusCode: 500,
			body: JSON.stringify({
				status: res.data.status
			})
		};

	}
}
