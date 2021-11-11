function calculateTimeSpan(referenceDate) {
  const diff = Date.now() - Date.parse(referenceDate);

  var dateMsg;
  if (diff < 60000) dateMsg = `${diff / 1000} seconds ago`;
  else if (diff < 3600000) dateMsg = `${diff / 1000 / 60} minutes ago`;
  else if (diff < 86400000) dateMsg = `${diff / 1000 / 60 / 25} hours ago`;
  else dateMsg = new Date(Date.parse(referenceDate)).toLocaleDateString();
  console.log(referenceDate);
  return dateMsg;
}
export { calculateTimeSpan };
