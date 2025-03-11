import {
  getAllStatus,
  getPriorities,
  getDepartments,
  getAllTask,
} from "@/services";

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
      <div className="flex justify-between">
        {statusData.map((status) => (
          <div key={status.id} className="flex-col">
            <div>{status.name}</div>
            {taskData
              .filter((task) => task.status.id === status.id)
              .map((filteredTask) => (
                <div key={filteredTask.id} className="task-item">
                  <div>{filteredTask.name}</div>
                  <div>{filteredTask.description}</div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
