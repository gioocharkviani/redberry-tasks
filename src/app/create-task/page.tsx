import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import React from "react";

const CreateTaskPage = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[34px] font-[600]">შექმენი ახალი დავალება</h1>
      <div className="w-full bg-[#FBF9FFA6] border-[0.3px] px-[55px] py-[65px] border-[#DDD2FF] rounded-[4px] mt-[25px]">
        <form>
          <div className="flex gap-[55px] flex-col">
            <Input
              label="სათაური*"
              requiredFilds={[
                { id: 1, text: "მინიმუმ 2 სიმბოლო" },
                { id: 2, text: "მაქსიმუმ 255 სიმბოლო" },
              ]}
            />

            <Textarea
              label="აღწერა"
              requiredFilds={[
                { id: 1, text: "მინიმუმ 2 სიმბოლო" },
                { id: 2, text: "მაქსიმუმ 255 სიმბოლო" },
              ]}
            />
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
