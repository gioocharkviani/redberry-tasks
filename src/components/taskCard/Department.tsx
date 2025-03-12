import { DepartmentType } from "@/types";
import React from "react";

const Department = ({ data }: { data: DepartmentType }) => {
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
      backgroundColor = "bg-[#00FF00]";
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
    <div
      className={`py-[5px] font-[400] text-center max-w-[88px] overflow-hidden  text-[12px] text-white px-[9px] rounded-[15px] h-[24px] ${backgroundColor}`}
    >
      {data.name}
    </div>
  );
};

export default Department;
