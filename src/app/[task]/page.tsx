import Department from "@/components/taskCard/Department";
import Priority from "@/components/taskCard/Priority";
import { getAllComment, getCurrentTask } from "@/services";
import Image from "next/image";
import React from "react";
import { changeCalendarFormat } from "@/utils/changeCalendarFormat";

//accets
import statusImg from "../../../public/status.svg";
import userImg from "../../../public/user.svg";
import calendarImg from "../../../public/calendar.svg";
import Comments from "@/components/Comments";
import DropDownSelect from "@/components/ui/DropDownSelect";

const currentTaskPage = async ({
  params,
}: {
  params: Promise<{ task: string }>;
}) => {
  const { task } = await params;
  const taskData = await getCurrentTask(parseInt(task));
  const commentData = await getAllComment(parseInt(task));
  const dueData = changeCalendarFormat(taskData.due_date, "georgian");
  return (
    <div className="flex w-full justify-between gap-10">
      <div className="w-[715px] h-[500px] flex flex-col bg-white">
        <div>
          <div className="flex gap-[23px]">
            <Priority data={taskData.priority} />
            <Department hovered={false} data={taskData.department} />
          </div>
          <h1 className="mt-[12px] text-[36px] font-[600]">{taskData.name}</h1>
          <div className="mt-[36px] text-[18px] font-[400] leading-[150%]">
            {taskData.description}
          </div>
        </div>
        <div className="mt-[63px] flex flex-col">
          <h2 className="text-[24px] font-[500]">დავალების დეტალები</h2>
          <div className="grid grid-cols-2 gap-4 mt-[18px]">
            <div className="h-[70px] flex items-center gap-[8px]">
              <Image width={24} height={24} src={statusImg} alt="status" />
              <span className="text-[16px] font-[400]">სტატუსი</span>
            </div>
            <div className="h-[70px] flex  gap-[8px]">
              <DropDownSelect />
            </div>
            <div className="h-[70px] flex items-center gap-[8px]">
              <Image width={24} height={24} src={userImg} alt="status" />
              <span className="text-[16px] font-[400]">თანამშრომელი</span>
            </div>
            <div className="h-[70px] flex items-center gap-[8px]">
              <div className="flex gap-2">
                <div className="w-[32px] rounded-[50%] bg-gray-400 overflow-hidden h-[32px]">
                  <Image
                    width={24}
                    height={24}
                    src={taskData.employee.avatar}
                    alt="status"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-[300]">
                    {taskData.employee.department.name}
                  </span>
                  <span className="text-[14px] font-[300]">
                    {taskData.employee.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[70px] flex  items-center gap-[8px]">
              <Image width={24} height={24} src={calendarImg} alt="status" />
              <span className="text-[16px] font-[400]">დავალების ვადა</span>
            </div>
            <div className="h-[70px] flex  items-center gap-[8px]">
              {dueData}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[741px] bg-[#F8F3FEA6] mt-[60px] border-[0.3px] px-[45px] py-[40px] border-[#DDD2FF] rounded-[10px]">
        <Comments data={commentData} />
      </div>
    </div>
  );
};

export default currentTaskPage;
