"use client";
import Calendar from "@/components/ui/Calendar";
import DropDownSelect from "@/components/ui/DropDownSelect";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import React from "react";

const CreateTaskPage = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[34px] font-[600]">შექმენი ახალი დავალება</h1>
      <div className="w-full bg-[#FBF9FFA6] border-[0.3px] px-[55px] py-[65px] border-[#DDD2FF] rounded-[4px] mt-[25px]">
        <form>
          <div className="gap-[55px] grid grid-cols-2">
            <Input
              label="სათაური*"
              value="testt"
              onChange={() => {}}
              requiredFilds={[
                { id: 1, text: "მინიმუმ 2 სიმბოლო" },
                { id: 2, text: "მაქსიმუმ 255 სიმბოლო" },
              ]}
            />
            <DropDownSelect defaultValue="" disable label="ტესსტირება">
              <button>test</button>
            </DropDownSelect>

            <Textarea
              label="აღწერა"
              value="testt"
              onChange={() => {}}
              requiredFilds={[
                { id: 1, text: "მინიმუმ 2 სიმბოლო" },
                { id: 2, text: "მაქსიმუმ 255 სიმბოლო" },
              ]}
            />
            <DropDownSelect defaultValue="" disable label="ტესსტირება">
              <button>test</button>
            </DropDownSelect>

            <div className="flex gap-5 ">
              <DropDownSelect defaultValue="" disable label="ტესსტირება">
                <button>test</button>
              </DropDownSelect>
              <DropDownSelect defaultValue="" disable label="ტესსტირება">
                <button>test</button>
              </DropDownSelect>
            </div>

            <div className="w-[200px]">
              <Calendar label="დედლაინი" />
            </div>
          </div>
          <div></div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
