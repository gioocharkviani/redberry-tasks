import React from "react";

const FormattedDate = ({ data }: { data: string }) => {
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

  const dueDate = new Date(data);
  const day = dueDate.getDate();
  const month = months[dueDate.getMonth()];
  const year = dueDate.getFullYear();

  const formattedDueDate = `${day} ${month}, ${year}`;
  return <span className="text-[12] font-[400]">{formattedDueDate}</span>;
};

export default FormattedDate;
