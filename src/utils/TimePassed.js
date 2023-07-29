export const getTimePassed = (targetDate) => {
  const now = new Date();
  const timeDifference = now - targetDate;
  const totalHourPassed = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysPassed = Math.floor(totalHourPassed / 24);
  const remainingHours = totalHourPassed % 24;

  const dayText =
    daysPassed > 0 ? `${daysPassed} day${daysPassed === 1 ? "" : "s"} and` : "";
  const hoursText = `${remainingHours} hour${remainingHours === 1 ? "" : "s"}`;

  return dayText + " " + hoursText + " ago";
};
