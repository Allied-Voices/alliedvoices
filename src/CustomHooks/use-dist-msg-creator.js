export default function useDistMsgCreator() {
  
  const createDistMsg = (originLat, originLng, destinationLat, destinationLng) => {
    var d;
    if (Number(originLat) && Number(originLng) && Number(destinationLat) && Number(destinationLng)) {
      const rad1 = destinationLat * Math.PI / 180;
      const rad2 = originLat * Math.PI / 180;
      const diffLat = (originLat - destinationLat) * Math.PI / 180;
      const diffLng = (originLng - destinationLng) * Math.PI / 180;
      const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) + Math.cos(rad1) * Math.cos(rad2) * Math.sin(diffLng / 2) * Math.sin(diffLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      d = 3958.8 * c;
    } else {
      d = "Unknown"
    }

    console.log(d);

    if(d){
      return ((d > 10 || d === 0) ? Math.floor(d) : d.toFixed(2)) + " mi away";
    }

    return null;
  };

  return { createDistMsg };
};