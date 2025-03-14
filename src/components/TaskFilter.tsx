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

const selectbyData = [
  { id: 1, name: "დეპარტამენტი", queryName: "department" },
  { id: 2, name: "პრიორიტეტი", queryName: "department" },
  { id: 3, name: "თანამშრომელი", queryName: "employ" },
];

const TaskFilter = ({ filterBy }: TaskFilterProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedData, setSelectedData] = useState<
    Employee[] | DepartmentType[] | PriorityTypes[]
  >([]);

  const handleOpen = (id: number) => {
    if (open && activeId === id) {
      setOpen(false);
      setActiveId(null);
    } else {
      setActiveId(id);
      setOpen(true);
    }
  };

  const saveLocalStorage = () => {
    // Create an object that stores the selected data for each category
    const selectedItems = {
      employees: selectedData.filter((item) => "avatar" in item),
      departments: selectedData.filter(
        (item) => !("avatar" in item) && item.id
      ),
      priorities: selectedData.filter((item) => !("avatar" in item) && item.id), // Filter priorities (based on missing 'avatar')
    };

    localStorage.setItem(
      "selectedEmployees",
      JSON.stringify(selectedItems.employees)
    );
    localStorage.setItem(
      "selectedDepartments",
      JSON.stringify(selectedItems.departments)
    );
    localStorage.setItem(
      "selectedPriorities",
      JSON.stringify(selectedItems.priorities)
    );
  };

  const handleChoose = () => {
    saveLocalStorage();
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
    let dataToRender: Employee[] | DepartmentType[] | PriorityTypes[] = [];
    if (activeId === 1) {
      dataToRender = filterBy.departments;
    } else if (activeId === 2) {
      dataToRender = filterBy.priorities;
    } else if (activeId === 3) {
      dataToRender = filterBy.employees;
    }

    return (
      <div className="flex flex-col gap-2">
        {dataToRender.map((item) => {
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
              <Button type="fourth" onClick={() => handleChoose()}>
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
