import { Task } from "@/types";
import React from "react";
import Department from "./Department";
import Priority from "./Priority";
import Image from "next/image";
import comm from "../../../public/comment.svg";
import Link from "next/link";
import { changeCalendarFormat } from "@/utils/changeCalendarFormat";

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

  const truncateDescription = (text: string, charLimit: number) => {
    const textWithoutSpaces = text.replace(/\s/g, "");
    if (textWithoutSpaces.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  const truncatedDescription = truncateDescription(data.description, 100);
  const dueData = changeCalendarFormat(data.due_date, "standard");

  return (
    <Link href={`/${data.id}`}>
      <div
        className={`w-full border-[1px] flex justify-between flex-col p-[20px] max-w-[381px] relative overflow-hidden h-[217px] rounded-[15px] ${bgColor}`}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-[10px] w-max shrink-0 ">
            <Priority data={data.priority} />
            <Department hovered={true} data={data.department} />
          </div>
          <div className="text-[12] font-[400]">{dueData}</div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[15px] font-[500]">{data.name}</span>
          <span className="text-[12px] font-[400]">{truncatedDescription}</span>
        </div>

        <div className="flex justify-between gap-3">
          <div className="w-[31] h-[31] rounded-[50%] bg-[#dde0ea] overflow-hidden">
            {data.employee.avatar ? (
              <Image
                src={data.employee.avatar}
                width={31}
                height={31}
                alt={data.employee.name}
                className="w-full h-full "
                unoptimized
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className="flex  items-center gap-2">
            <Image src={comm} width={20} height={18} alt="comment" />
            <span className="text-[14px] font-[400]">
              {data.total_comments}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
