"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Buttons";
import Image from "next/image";
import CustomCheckbox from "./ui/CustomCheckbox";
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

  const [department, setDepartment] = useState<DepartmentType[]>([]);
  const [priority, setPriority] = useState<PriorityTypes[]>([]);
  const [employs, setEmploys] = useState<Employee[]>([]);
  const [filterAllData, setFilterAllData] = useState<
    PriorityTypes[] | DepartmentType[] | Employee[]
  >([]);

  // Load filters from localStorage
  const loadFiltersFromLocalStorage = () => {
    const departmentData = localStorage.getItem("department");
    const priorityData = localStorage.getItem("priority");
    const employData = localStorage.getItem("employ");

    const selectedDepartments: DepartmentType[] = [];
    const selectedPriorities: PriorityTypes[] = [];
    const selectedEmployees: Employee[] = [];

    if (departmentData) {
      const depParamsData = departmentData.split(",");
      filterBy.departments.forEach((i) => {
        if (depParamsData.includes(i.id.toString())) {
          selectedDepartments.push(i);
        }
      });
      setDepartment(selectedDepartments);
    }
    if (priorityData) {
      const priParamsData = priorityData.split(",");
      filterBy.priorities.forEach((i) => {
        if (priParamsData.includes(i.id.toString())) {
          selectedPriorities.push(i);
        }
      });
      setPriority(selectedPriorities);
    }
    if (employData) {
      const empParamsData = employData.split(",");
      filterBy.employees.forEach((i) => {
        if (empParamsData.includes(i.id.toString())) {
          selectedEmployees.push(i);
        }
      });
      setEmploys(selectedEmployees);
    }

    const allSelectedData = [
      ...selectedDepartments,
      ...selectedEmployees,
      ...selectedPriorities,
    ];
    setFilterAllData(allSelectedData);
  };

  useEffect(() => {
    loadFiltersFromLocalStorage();
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [renderData, setRenderData] = useState<
    Employee[] | DepartmentType[] | PriorityTypes[]
  >([]);

  const handleFilter = () => {
    setFilterAllData([...department, ...priority, ...employs]);

    if (activeId === 1) {
      const ids = department.map((item) => item.id);
      localStorage.setItem("department", ids.join(","));
    } else if (activeId === 2) {
      const ids = priority.map((item) => item.id);
      localStorage.setItem("priority", ids.join(","));
    } else if (activeId === 3) {
      const ids = employs.map((item) => item.id);
      localStorage.setItem("employ", ids.join(","));
    }
  };

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

  const isCheckedFunc = (item: Employee | DepartmentType | PriorityTypes) => {
    let isChecked = false;
    if (activeId === 1) {
      isChecked = department.some(
        (selectedItem) => selectedItem.id === item.id
      );
    } else if (activeId === 2) {
      isChecked = priority.some((selectedItem) => selectedItem.id === item.id);
    } else if (activeId === 3) {
      isChecked = employs.some((selectedItem) => selectedItem.id === item.id);
    }
    return isChecked;
  };

  const handleCheckboxChange = (
    item: Employee | DepartmentType | PriorityTypes
  ) => {
    if (activeId === 1) {
      setDepartment((prev) => {
        const newDepartment = prev.some(
          (selectedItem) => selectedItem.id === item.id
        )
          ? prev.filter((selectedItem) => selectedItem.id !== item.id)
          : [...prev, item];

        const ids = newDepartment.map((item) => item.id);
        localStorage.setItem("department", ids.join(","));

        return newDepartment;
      });
    }
    if (activeId === 2) {
      setPriority((prev) => {
        const newPriority = prev.some(
          (selectedItem) => selectedItem.id === item.id
        )
          ? prev.filter((selectedItem) => selectedItem.id !== item.id)
          : [...prev, item];

        const ids = newPriority.map((item) => item.id);
        localStorage.setItem("priority", ids.join(","));

        return newPriority;
      });
    }
    if (activeId === 3) {
      setEmploys([item]);
      localStorage.setItem("employ", item.id.toString());
    }
  };

  const RenderCheckbox = () => {
    return (
      <div className="flex flex-col gap-2">
        {renderData.map((item) => {
          const isChecked = isCheckedFunc(item);
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

  const clearFilter = () => {
    setEmploys([]);
    setDepartment([]);
    setPriority([]);
    setFilterAllData([]);
    localStorage.removeItem("employ");
    localStorage.removeItem("priority");
    localStorage.removeItem("department");
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
              className={`py-[10px] flex gap-2 items-center cursor-pointer ${
                i.data.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              } px-[18px] text-[16px] font-[400] ${
                open && activeId === i.id ? "text-[#8338EC]" : "text-[black]"
              }`}
            >
              {i.name}
              {open && activeId === i.id ? (
                <Image src="arrow.svg" width={14} height={8} alt="arrow" />
              ) : (
                <Image
                  src="arrowdefault.svg"
                  width={14}
                  height={8}
                  alt="arrow"
                />
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
              <Button type="fourth" onClick={() => handleFilter()}>
                არჩევა
              </Button>
            </div>
          </div>
        )}
      </div>
      {filterAllData.length > 0 && (
        <div className="mt-[25px] flex flex-wrap gap-8 w-full">
          {filterAllData.map((i) => (
            <button
              onClick={() => {}}
              className="py-[6px] px-[10px] border border-[#CED4DA] rounded-[43px]"
              key={i.id + i.name}
            >
              {i.name}
            </button>
          ))}
          <button
            className="cursor-pointer text-[14] font-400"
            onClick={() => clearFilter()}
          >
            გასუფთავება
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
