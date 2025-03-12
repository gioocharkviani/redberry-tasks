import { Task } from "@/types";
import React from "react";
import Department from "./Department";
import Priority from "./Priority";
import Date from "./Date";
import Image from "next/image";

const TaskCard = ({ data }: { data: Task }) => {
  let bgColor;
  switch (data.status.id) {
    case 1:
      bgColor = "border-[#F7BC30]";
      break;
    case 2:
      bgColor = "border-[#FB5607]";
      break;
    case 3:
      bgColor = "border-[#FF006E]";
      break;
    case 4:
      bgColor = "border-[#3A86FF]";
      break;
    default:
      bgColor = "border-[gray]";
  }
  return (
    <div
      className={`w-full border-[1px] flex justify-between flex-col p-[20px] max-w-[381px] relative overflow-hidden h-[217px] rounded-[15px] ${bgColor}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-[10px] w-max shrink-0 ">
          <Department data={data.department} />
          <Priority data={data.priority} />
        </div>
        <Date data={data.due_date} />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[15px] font-[500]">{data.name}</span>
        <span className="text-[12px] font-[400]">{data.description}</span>
      </div>

      <div className="flex justify-between gap-3">
        <div>
          {data.employee && (
            <Image
              src={data.employee.avatar}
              width={31}
              height={31}
              alt="123"
            />
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TaskCard;
