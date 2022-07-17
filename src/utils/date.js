function calculateTimeSpan(referenceDate) {
  const diff = Date.now() - Date.parse(referenceDate);
  var dateMsg;
  // 1 hr = 3600000 ms
  if (diff < 3600000) dateMsg = "0 hours ago";
  // 2 hr = 7200000 ms
  else if (diff >= 3600000 && diff < 7200000) dateMsg = "1 hour ago";
  // 1 d = 86400000 ms
  else if (diff >= 7200000 && diff < 86400000)
    dateMsg = `${Math.floor(diff / 1000 / 60 / 60)} hours ago`;
  // 2 d = 172800000 ms
  else if (diff >= 86400000 && diff < 172800000) dateMsg = "1 day ago";
  // 11 d = 950400000 ms
  else if (diff >= 172800000 && diff < 950400000)
    dateMsg = `${Math.floor(diff / 1000 / 60 / 60 / 24)} days ago`;
  else dateMsg = new Date(Date.parse(referenceDate)).toLocaleDateString();
  return dateMsg;
}

export { calculateTimeSpan };
