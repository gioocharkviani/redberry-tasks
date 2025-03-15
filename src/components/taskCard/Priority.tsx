import { PriorityTypes } from "@/types";
import Image from "next/image";
import React from "react";

const Priority = ({ data }: { data: PriorityTypes }) => {
  let mainColor;
  switch (data.id) {
    case 1:
      mainColor = "#08A508";
      break;
    case 2:
      mainColor = "#FFBE0B";
      break;
    case 3:
      mainColor = "#FA4D4D";
      break;
    default:
      mainColor = "gray";
  }
  return (
    <div
      className={`flex w-full items-center border-[0.5px] max-w-[86px] h-[26px] p-[4px] gap-1 rounded-[5px]`}
      style={{ borderColor: mainColor }}
    >
      <Image src={`${data.icon}`} alt={data.name} width={16} height={16} />
      <span className={`text-[12px] font-[500] `} style={{ color: mainColor }}>
        {data.name}
      </span>
    </div>
  );
};

export default Priority;
