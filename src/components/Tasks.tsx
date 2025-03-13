import React from "react";
import StatusBar from "./StatusBar";
import TaskCard from "./taskCard/TaskCard";
import { Status, Task } from "@/types";

const Tasks = ({
  statusData,
  taskData,
}: {
  statusData: Status[];
  taskData: Task[];
}) => {
  return (
    <div className="flex justify-between gap-6 2xl:gap-[52px] w-full">
      {statusData.map((status: Status) => (
        <div key={status.id} className="flex-col gap-[30px] flex w-full">
          <StatusBar id={status.id} name={status.name} key={status.id} />
          {taskData
            .filter((task: Task) => task.status.id === status.id)
            .map((filteredTask: Task) => (
              <TaskCard data={filteredTask} key={filteredTask.id} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default Tasks;
