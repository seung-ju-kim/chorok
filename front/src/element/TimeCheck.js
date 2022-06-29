const TimeCheck = ({ commentedTime }) => {
  const now = new Date();

  const minute = Math.floor(
    (now.getTime() - Date.parse(commentedTime)) / 1000 / 60
  );
  if (minute < 1) return "방금전";
  if (minute < 60) {
    return `${minute}분전`;
  }

  const hour = Math.floor(minute / 60);
  if (hour < 24) {
    return `${hour}시간전`;
  }

  const day = Math.floor(minute / 60 / 24);
  if (day < 365) {
    return `${day}일전`;
  }

  return `${Math.floor(day / 365)}년전`;
};

export default TimeCheck;

/*
commentedTime = isoUtcDateTime
*/
