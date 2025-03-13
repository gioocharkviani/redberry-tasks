import {
  getAllStatus,
  getPriorities,
  getDepartments,
  getAllTask,
} from "@/services";
import TaskFilter from "@/components/TaskFilter";
import { getAllemploy } from "@/services/employ.service";
import Tasks from "@/components/Tasks";
export default async function Home() {
  const statusData = await getAllStatus();
  const taskData = await getAllTask();

  const prioritiesData = await getPriorities();
  const departmentData = await getDepartments();
  const employ = await getAllemploy();

  return (
    <div className="flex flex-col w-full relative">
      <h1 className="font-[600] text-[36px]">დავალებების გვერდი</h1>
      <TaskFilter
        filterBy={{
          priorities: prioritiesData,
          departments: departmentData,
          employees: employ,
        }}
      />
      <Tasks statusData={statusData} taskData={taskData} />
    </div>
  );
}
