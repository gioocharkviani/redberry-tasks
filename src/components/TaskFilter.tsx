"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Buttons";
import arrow from "../../publiC/arrow.svg";
import arrowdefault from "../../public/arrowdefault.svg";
import Image from "next/image";
import CustomCheckbox from "./ui/CustomCheckbox";

// Import your types
import { Employee, DepartmentType, PriorityTypes } from "@/types";

interface FilterData {
  priorities: PriorityTypes[];
  departments: DepartmentType[];
  employees: Employee[];
}

interface TaskFilterProps {
  filterBy: FilterData;
}

const TaskFilter = ({ filterBy }: TaskFilterProps) => {
  const selectbyData = [
    { id: 1, name: "დეპარტამენტი", data: filterBy.departments },
    { id: 2, name: "პრიორიტეტი", data: filterBy.priorities },
    { id: 3, name: "თანამშრომელი", data: filterBy.employees },
  ];
  const [open, setOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<
    Employee[] | DepartmentType[] | PriorityTypes[]
  >([]);
  const [renderData, setRenderData] = useState<
    Employee[] | DepartmentType[] | PriorityTypes[]
  >([]);

  const handleOpen = (
    id: number,
    data: Employee[] | DepartmentType[] | PriorityTypes[]
  ) => {
    if (open && activeId === id) {
      setOpen(false);
      setRenderData([]);
      setActiveId(null);
    } else {
      setRenderData(data);
      setActiveId(id);
      setOpen(true);
    }
  };

  const handleCheckboxChange = (
    item: Employee | DepartmentType | PriorityTypes
  ) => {
    setSelectedData((prev) => {
      if (activeId === 3) {
        const filteredData = prev.filter(
          (selectedItem) =>
            !filterBy.employees.some((emp) => emp.id === selectedItem.id)
        );

        const isItemSelected = selectedData.some(
          (selectedItem) => selectedItem.id === item.id
        );

        const returnedData = isItemSelected
          ? filteredData.filter((selectedItem) => selectedItem.id !== item.id)
          : [...filteredData, item];

        return returnedData;
      }
      return prev.some((selectedItem) => selectedItem.id === item.id)
        ? prev.filter((selectedItem) => selectedItem.id !== item.id)
        : [...prev, item];
    });
  };

  const RenderCheckbox = () => {
    return (
      <div className="flex flex-col gap-2">
        {renderData.map((item) => {
          const isChecked = selectedData.some(
            (selectedItem) =>
              selectedItem.id === item.id && selectedItem.name === item.name
          );
          const avatar = "avatar" in item ? item.avatar : "";
          return (
            <div key={item.id} className="flex items-center gap-2">
              <CustomCheckbox
                checked={isChecked}
                icon={avatar}
                onChange={() => handleCheckboxChange(item)}
                label={item.name}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col mt-[52px] mb-[24px]">
      <div className="relative w-max">
        <div className="border flex items-center gap-[41px] border-[#DEE2E6] w-max rounded-[10px] h-[44px]">
          {selectbyData.map((i) => (
            <button
              disabled={i.data.length === 0}
              key={i.id}
              onClick={() => handleOpen(i.id, i.data)}
              className={`py-[10px] flex gap-2 items-center ${
                i.data.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              } px-[18px] text-[16px] font-[400] ${
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
