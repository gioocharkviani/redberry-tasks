import CreateTask from "@/components/forms/CreateTask";
import { getAllStatus, getDepartments, getPriorities } from "@/services";
import { getAllemploy } from "@/services/employ.service";
import React from "react";

const CreateTaskPage = async () => {
  const statusData = (await getAllStatus()) || [];
  const prioritiesData = (await getPriorities()) || [];
  const departmentData = (await getDepartments()) || [];
  const employ = (await getAllemploy()) || [];
  return (
    <div className="flex flex-col">
      <h1 className="text-[34px] font-[600]">შექმენი ახალი დავალება</h1>
      <div className="w-full bg-[#FBF9FFA6] border-[0.3px] p-[10px] md:px-[55px] md:py-[65px] border-[#DDD2FF] rounded-[4px] mt-[25px]">
        <CreateTask
          department={departmentData}
          employ={employ}
          priorities={prioritiesData}
          status={statusData}
        />
      </div>
    </div>
  );
};

export default CreateTaskPage;
