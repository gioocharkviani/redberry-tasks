"use client";
import Department from "@/components/taskCard/Department";
import Priority from "@/components/taskCard/Priority";
import DropDownSelect from "@/components/ui/DropDownSelect";
import { Status, Task } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { changeCalendarFormat } from "@/utils/changeCalendarFormat";

import statusImg from "../../../../public/status.svg";
import userImg from "../../../../public/user.svg";
import calendarImg from "../../../../public/calendar.svg";

import { changeStatusAction } from "@/actions/changeStatus";

interface DetailInfo {
  taskData: Task;
  statusData: Status[];
}

const DetailInfo = ({ taskData, statusData }: DetailInfo) => {
  const dueData = changeCalendarFormat(taskData.due_date, "georgian");
  const [statusSelect, setStatusSelect] = useState<string>(
    taskData.status.name
  );

  const handleChangeStatus = async (i: Status) => {
    setStatusSelect(i.name);
    changeStatusAction({ taskId: taskData.id, statusId: i.id });
  };

  return (
    <div>
      <div className="flex gap-[23px]">
        <Priority data={taskData.priority} />
        <Department hovered={false} data={taskData.department} />
      </div>
      <h1 className="mt-[12px] text-[36px] font-[600]">{taskData.name}</h1>
      <div className="mt-[36px] text-[18px] font-[400] leading-[150%]">
        {taskData.description}
      </div>

      <div className="mt-[63px] flex flex-col">
        <h2 className="text-[24px] font-[500]">დავალების დეტალები</h2>
        <div className="grid grid-cols-2 gap-4 mt-[18px]">
          <div className="h-[70px] flex items-center gap-[8px]">
            <Image width={24} height={24} src={statusImg} alt="status" />
            <span className="text-[16px] font-[400]">სტატუსი</span>
          </div>
          <div className="h-[70px] flex my-[12.5px] gap-[8px]">
            <DropDownSelect selected={statusSelect || taskData.status.name}>
              {statusData.map((i) => (
                <button
                  onClick={() => handleChangeStatus(i)}
                  key={i.id}
                  className="px-[14px] text-start cursor-pointer w-full py-[12px] text-[14px] font-[300]"
                >
                  {i.name}
                </button>
              ))}
            </DropDownSelect>
          </div>
          <div className="h-[70px] flex items-center gap-[8px]">
            <Image
              className="shrink-0"
              width={24}
              height={24}
              src={userImg}
              alt="user"
            />
            <span className="text-[16px] font-[400]">თანამშრომელი</span>
          </div>
          <div className="h-[70px] flex items-center gap-[8px]">
            <div className="flex gap-2">
              <div className="w-[32px] shrink-0 rounded-[50%] bg-[#c7d0ec]  overflow-hidden h-[32px]">
                <Image
                  width={32}
                  height={32}
                  src={`${taskData.employee.avatar}`}
                  alt="user avatar"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-[300]">
                  {taskData.employee.department?.name}
                </span>
                <span className="text-[14px] font-[300]">
                  {taskData.employee.name}
                </span>
              </div>
            </div>
          </div>
          <div className="h-[70px] flex items-center gap-[8px]">
            <Image
              className="shrink-0"
              width={24}
              height={24}
              src={calendarImg}
              alt="calendar"
            />

            <span className="text-[16px] font-[400]">დავალების ვადა</span>
          </div>
          <div className="h-[70px] flex items-center gap-[8px]">{dueData}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
