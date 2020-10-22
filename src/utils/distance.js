function calculateDistance(originLat, originLng, lat, lng){
  var d;
  if (Number(originLat) && Number(originLng) && Number(lat) && Number(lng)) {
    const rad1 = lat * Math.PI / 180;
    const rad2 = originLat * Math.PI / 180;
    const diffLat = (originLat - lat) * Math.PI / 180;
    const diffLng = (originLng - lng) * Math.PI / 180;
    const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(rad1) * Math.cos(rad2) * Math.sin(diffLng / 2) * Math.sin(diffLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    d = Math.floor(3958.8 * c);
  } else {
    d = "Unknown"
  }

  return d + 'mi away';
}

export { calculateDistance }