export const timeFormat = (seconds, ending) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (ending) {
    if (minutes > 0) {
      if (remainingSeconds === 0) {
        return `${minutes}:00`;
      }
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    } else {
      return `0:${remainingSeconds.toString().padStart(2, "0")}`;
    }
  } else if (minutes > 0) {
    if (remainingSeconds === 0) {
      return `${minutes}분`;
    }
    return `${minutes}분 ${remainingSeconds}초`;
  } else {
    return `${remainingSeconds}초`;
  }
};

export const stringTimeFormat = (timeString) => {
  const formatTime = (timeString) => {
    const [minutesPart, secondsPart] = timeString.split(" ").reduce(
      (acc, part) => {
        if (part.includes("분")) {
          acc[0] = parseInt(part.replace("분", ""), 10);
        } else if (part.includes("초")) {
          acc[1] = parseInt(part.replace("초", ""), 10);
        }
        return acc;
      },
      [0, 0]
    );

    const minutes = minutesPart || 0;
    const seconds = secondsPart || 0;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return formatTime(timeString);
};

export const timeStringToSeconds = (timeString) => {
  const [minutesPart, secondsPart] = timeString.split(" ").reduce(
    (acc, part) => {
      if (part.includes("분")) {
        acc[0] = parseInt(part.replace("분", ""), 10);
      } else if (part.includes("초")) {
        acc[1] = parseInt(part.replace("초", ""), 10);
      }
      return acc;
    },
    [0, 0]
  );

  const minutes = minutesPart || 0;
  const seconds = secondsPart || 0;

  return minutes * 60 + seconds;
};

export default { timeFormat, stringTimeFormat, timeStringToSeconds };
