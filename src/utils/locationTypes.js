export default function determineLocationZoom(locationType) {
  const pointZoomTypes = [
    "street_address",
    "postal_code",
    "point_of_interest",
    "plus_code",
    "intersection",
  ];
  const smallAreaZoomTypes = [
    "neighborhood",
    "premise",
    "subpremise",
    "park",
    "natural_feature",
    "airport",
  ];
  const mediumAreaZoomTypes = ["route"];
  const largeAreaZoomTypes = [
    "political",
    "administrative_area_level_1",
    "administrative_area_level_2",
    "administrative_area_level_3",
    "administrative_area_level_4",
    "administrative_area_level_5",
    "locality",
    "sublocality",
  ];
  const xLargeAreaZoomTypes = ["country"];

  if (pointZoomTypes.includes(locationType)) {
    return 16;
  } else if (smallAreaZoomTypes.includes(locationType)) {
    return 15;
  } else if (mediumAreaZoomTypes.includes(locationType)) {
    return 14;
  } else if (largeAreaZoomTypes.includes(locationType)) {
    return 13;
  } else if (xLargeAreaZoomTypes.includes(locationType)) {
    return 5;
  } else {
    return 13;
  }
}
