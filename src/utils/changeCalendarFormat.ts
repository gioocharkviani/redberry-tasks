export const changeCalendarFormat = (
  dateString: string,
  formatType: "georgian" | "standard"
) => {
  const weekdays = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];
  const months = [
    "იანვ",
    "თებ",
    "მარტ",
    "აპრ",
    "მაის",
    "ივნ",
    "ივლ",
    "აგვ",
    "სექტ",
    "ოქტ",
    "ნოემ",
    "დეკ",
  ];

  const date = new Date(dateString);

  const dayOfWeek = weekdays[date.getDay()];
  const day = date.getDate();
  const month = date.getMonth() + 1; // Get month (0-11, so +1)
  const year = date.getFullYear();

  if (formatType === "georgian") {
    return `${dayOfWeek} - ${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
    }/${year}`;
  } else if (formatType === "standard") {
    const monthName = months[date.getMonth()];
    return `${day} ${monthName}, ${year}`;
  }
};
