import StatusBar from "@/components/StatusBar";
import { Status, Task } from "@/types";
import {
  getAllStatus,
  getPriorities,
  getDepartments,
  getAllTask,
} from "@/services";
import TaskCard from "@/components/taskCard/TaskCard";

export default async function Home() {
  const statusData = await getAllStatus();
  const taskData = await getAllTask();
  //   const prioritiesData = await getPriorities();
  //   const departmentData = await getDepartments();
  console.log(taskData);

  return (
    <div className="flex flex-col w-full">
      <h1 className="font-[600] text-[36px]">დავალებების გვერდი</h1>
      <div className="">her will be filter</div>
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
    </div>
  );
}
