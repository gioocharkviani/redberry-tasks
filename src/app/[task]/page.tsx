import { getAllComment, getAllStatus, getCurrentTask } from "@/services";
import React from "react";

//accets
import Comments from "./_components/Comments";
import DetailInfo from "./_components/DetailInfo";

const currentTaskPage = async ({
  params,
}: {
  params: Promise<{ task: string }>;
}) => {
  const { task } = await params;
  const taskData = await getCurrentTask(parseInt(task));
  const commentData = await getAllComment(parseInt(task));
  const statusData = await getAllStatus();
  return (
    <div className="flex w-full justify-between gap-10 ">
      <div className="w-[715px] h-[500px] flex flex-col bg-white">
        <DetailInfo statusData={statusData} taskData={taskData} />
      </div>
      <div className="w-[741px] bg-[#F8F3FEA6] mt-[60px] border-[0.3px] px-[45px] py-[40px] border-[#DDD2FF] rounded-[10px]">
        <Comments taskId={taskData.id} data={commentData} />
      </div>
    </div>
  );
};

export default currentTaskPage;
