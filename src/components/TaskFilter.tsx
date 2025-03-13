"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Buttons";
import arrow from "../../publiC/arrow.svg";
import arrowdefault from "../../public/arrowdefault.svg";
import Image from "next/image";
import CustomCheckbox from "./ui/CustomCheckbox";

import { DepartmentType, Employee, PriorityTypes } from "@/types";

interface FilterData {
  priorities: PriorityTypes[];
  departments: DepartmentType[];
  employees: Employee[];
}
interface TaskFilterProps {
  filterBy: FilterData;
}

const selectbyData = [
  { id: 1, name: "დეპარტამენტი", data: "departments" },
  { id: 2, name: "პრიორიტეტი", data: "priorities" },
  { id: 3, name: "თანამშრომელი", data: "employees" },
];

const TaskFilter = ({ filterBy }: TaskFilterProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const handleOpen = (id: number) => {
    if (open && activeId === id) {
      setOpen(false);
      setActiveId(null);
    } else {
      setActiveId(id);
      setOpen(true);
    }
  };

  const RenderCheckbox = () => {
    return <CustomCheckbox label="test" />;
  };

  return (
    <div className="flex flex-col mt-[52px] mb-[24px]">
      <div className="relative w-max">
        <div className="border flex items-center gap-[41px] border-[#DEE2E6] w-max rounded-[10px] h-[44px]">
          {selectbyData.map((i) => (
            <button
              key={i.id}
              onClick={() => handleOpen(i.id)}
              className={`py-[10px] flex gap-2 items-center px-[18px] text-[16px] font-[400] ${
                open && activeId === i.id ? "text-[#8338EC]" : "text-[black]"
              }`}
            >
              {i.name}
              {open && activeId === i.id ? (
                <Image src={arrow} width={14} height={8} alt="arrow" />
              ) : (
                <Image src={arrowdefault} width={14} height={8} alt="arrow" />
              )}
            </button>
          ))}
        </div>

        {open && (
          <div className="pt-[40px] w-full px-[30px] pb-[20] absolute z-[9] top-[50px] bg-white border-[0.5px] border-[#8338EC] rounded-[10px]">
            <div>
              <RenderCheckbox />
            </div>
            <div className="w-full mt-[18px] flex justify-end">
              <Button type="fourth" onClick={() => {}}>
                არჩევა
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFilter;
