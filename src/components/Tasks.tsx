"use client";
import React from "react";
import StatusBar from "./StatusBar";
import TaskCard from "./taskCard/TaskCard";
import { Status, Task } from "@/types";
import { useFilterStore } from "@/store/filterStore";

const Tasks = ({
  statusData,
  taskData,
}: {
  statusData: Status[];
  taskData: Task[];
}) => {
  const { allSelectedData } = useFilterStore((state) => state);

  const filteredTasks = taskData.filter((task: Task) => {
    const isDepartmentMatch =
      allSelectedData.department.length === 0 ||
      allSelectedData.department.some((dep) => dep.id === task.department.id);
    const isEmployMatch =
      allSelectedData.employs.length === 0 ||
      allSelectedData.employs.some((emp) => emp.id === task.employee.id);
    const isPriorityMatch =
      allSelectedData.priority.length === 0 ||
      allSelectedData.priority.some((pri) => pri.id === task.priority.id);

    return isDepartmentMatch && isEmployMatch && isPriorityMatch;
  });

  return (
    <>
      {filteredTasks.length > 0 ? (
        <div className="flex justify-between gap-6 2xl:gap-[52px] w-full">
          {statusData.map((status: Status) => (
            <div key={status.id} className="flex-col gap-[30px] flex w-full">
              <StatusBar id={status.id} name={status.name} key={status.id} />
              {filteredTasks
                .filter((task: Task) => task.status.id === status.id)
                .map((filteredTask: Task) => (
                  <TaskCard data={filteredTask} key={filteredTask.id} />
                ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex mt-[20px] justify-center items-center font-[500] text-[18px]">
          დავალებები არ მოიძებნა ...
        </div>
      )}
    </>
  );
};

export default Tasks;
