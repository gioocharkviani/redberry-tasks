import React from "react";

const StatusBar = ({ name, id }: { name: string; id: number }) => {
  let backgroundColor;
  switch (id) {
    case 1:
      backgroundColor = "bg-[#F7BC30]";
      break;
    case 2:
      backgroundColor = "bg-[#FB5607]";
      break;
    case 3:
      backgroundColor = "bg-[#FF006E]";
      break;
    case 4:
      backgroundColor = "bg-[#3A86FF]";
      break;
    default:
      backgroundColor = "bg-none";
  }

  return (
    <div
      className={`rounded-[10px] z-[5] sticky top-[100px] w-full h-[54px] max-w-[381px] text-white py-[15px] flex justify-center items-center font-[500] text-[20px] ${backgroundColor}`}
    >
      {name}
    </div>
  );
};

export default StatusBar;
