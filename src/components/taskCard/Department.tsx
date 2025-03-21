import { DepartmentType } from "@/types";
import React from "react";

const Department = ({
  data,
  hovered,
}: {
  hovered?: boolean;
  data: DepartmentType;
}) => {
  let backgroundColor;
  switch (data.id) {
    case 1:
      backgroundColor = "bg-[#FF66A8]";
      break;
    case 2:
      backgroundColor = "bg-[#FD9A6A]";
      break;
    case 3:
      backgroundColor = "bg-[#89B6FF]";
      break;
    case 4:
      backgroundColor = "bg-[#FFD86D]";
      break;
    case 5:
      backgroundColor = "bg-[#8D45FF]";
      break;
    case 6:
      backgroundColor = "bg-[#0683bd]";
      break;
    case 7:
      backgroundColor = "bg-[#FF1493]";
      break;
    case 8:
      backgroundColor = "bg-[#00BFFF]";
      break;
    case 9:
      backgroundColor = "bg-[#FFD700]";
      break;
    case 10:
      backgroundColor = "bg-[#A52A2A]";
      break;
    default:
      backgroundColor = "bg-none";
  }

  return (
    <div className="relative">
      <div
        className={`py-[5px] font-[400] text-center ${
          hovered ? "max-w-[88px] hover:max-w-max" : ""
        } truncate  transition-all duration-300 ease-in-out absolute z-1 cursor-pointer text-white text-[12px]  px-[9px] rounded-[15px] h-[24px] ${backgroundColor} hover:scale-105 hover:bg-opacity-90 hover:shadow-lg`}
      >
        {data.name}
      </div>
    </div>
  );
};

export default Department;
