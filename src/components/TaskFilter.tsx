"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Buttons";
import Image from "next/image";
import CustomCheckbox from "./ui/CustomCheckbox";
import { Employee, DepartmentType, PriorityTypes } from "@/types";
import { useFilterStore } from "@/store/filterStore";

interface FilterData {
  priorities: PriorityTypes[];
  departments: DepartmentType[];
  employees: Employee[];
}

const TaskFilter = ({ filterBy }: { filterBy: FilterData }) => {
  const selectbyData = [
    { id: 1, name: "დეპარტამენტი", data: filterBy.departments },
    { id: 2, name: "პრიორიტეტი", data: filterBy.priorities },
    { id: 3, name: "თანამშრომელი", data: filterBy.employees },
  ];

  const {
    department,
    priority,
    employs,
    setDepartment,
    setEmploys,
    setPriority,
    setAllSelectedData,
    allSelectedData,
    resetFilters,
  } = useFilterStore((state) => state);

  const resetAllData = () => {
    resetFilters();
    sessionStorage.removeItem("selectedData");
  };

  //load dat from session storage
  useEffect(() => {
    const selectedData = sessionStorage.getItem("selectedData");
    if (selectedData) {
      const { department, priority, employs } = JSON.parse(selectedData);
      const fullDepartments = filterBy.departments.filter((dep) =>
        department.includes(dep.id)
      );
      const fullPriorities = filterBy.priorities.filter((pri) =>
        priority.includes(pri.id)
      );
      const fullEmploys = filterBy.employees.filter((emp) =>
        employs.includes(emp.id)
      );

      setDepartment(fullDepartments);
      setPriority(fullPriorities);
      setEmploys(fullEmploys);
      setAllSelectedData({
        department: fullDepartments,
        priority: fullPriorities,
        employs: fullEmploys,
      });
    }
  }, [filterBy, setDepartment, setPriority, setEmploys, setAllSelectedData]);

  //open filter Data box
  const [open, setOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  //check if item is checked
  const checkIfChecked = (id: number, name: string) => {
    if (
      department.some((i) => i.id === id && i.name === name) ||
      priority.some((i) => i.id === id && i.name === name) ||
      employs.some((i) => i.id === id && i.name === name)
    ) {
      return true;
    }
    return false;
  };

  //checkbox change multy and single select
  const handleCeheckboxChange = (
    i: PriorityTypes | DepartmentType | Employee
  ) => {
    if (activeId === 1) {
      const checkIfItemInsideArray = department.some(
        (department) => department.id === i.id
      );
      if (!checkIfItemInsideArray) {
        setDepartment([...department, i]);
      } else {
        const filterData = department.filter((dep) => dep.id !== i.id);
        setDepartment([...filterData]);
      }
    }
    if (activeId === 2) {
      const checkIfItemInsideArray = priority.some(
        (priority) => priority.id === i.id
      );
      if (!checkIfItemInsideArray) {
        setPriority([...priority, i]);
      } else {
        const filterData = priority.filter((pri) => pri.id !== i.id);
        setPriority([...filterData]);
      }
    }
    if (activeId === 3) {
      const checkIfItemInsideArray = employs.some((emp) => emp.id === i.id);
      if (!checkIfItemInsideArray) {
        setEmploys([i]);
      } else {
        const filterData = employs.filter((employee) => employee.id !== i.id);
        setEmploys(filterData);
      }
    }
  };

  const handleOpen = (id: number) => {
    if (open && activeId === id) {
      setOpen(false);
      setActiveId(null);
    } else {
      setActiveId(id);
      setOpen(true);
    }
  };

  const saveToSessionStorage = (
    department: DepartmentType[],
    priority: PriorityTypes[],
    employs: Employee[]
  ) => {
    sessionStorage.setItem(
      "selectedData",
      JSON.stringify({
        department: department.map((i) => i.id),
        priority: priority.map((i) => i.id),
        employs: employs.map((i) => i.id),
      })
    );
  };

  const handleChoose = () => {
    setAllSelectedData({
      department: [...department],
      priority: [...priority],
      employs: [...employs],
    });
    saveToSessionStorage(department, priority, employs);
  };

  // handle filter action
  const handeFilter = (i: PriorityTypes | Employee | DepartmentType) => {
    let updatedDepartment = [...department];
    let updatedPriority = [...priority];
    let updatedEmploys = [...employs];

    if (
      allSelectedData.department.find(
        (item) => item.id === i.id && i.name === item.name
      )
    ) {
      updatedDepartment = updatedDepartment.filter((item) => item.id !== i.id);
    } else if (
      allSelectedData.priority.find(
        (item) => item.id === i.id && i.name === item.name
      )
    ) {
      updatedPriority = updatedPriority.filter((item) => item.id !== i.id);
    } else if (
      allSelectedData.employs.find(
        (item) => item.id === i.id && i.name === item.name
      )
    ) {
      updatedEmploys = updatedEmploys.filter((item) => item.id !== i.id);
    }

    setDepartment(updatedDepartment);
    setPriority(updatedPriority);
    setEmploys(updatedEmploys);

    setAllSelectedData({
      department: updatedDepartment,
      priority: updatedPriority,
      employs: updatedEmploys,
    });
    saveToSessionStorage(updatedDepartment, updatedPriority, updatedEmploys);
  };

  const renderedData: PriorityTypes[] | DepartmentType[] | Employee[] = [
    ...allSelectedData.department,
    ...allSelectedData.priority,
    ...allSelectedData.employs,
  ];

  const RenderCheckbox = () => {
    const renderCheckboxData = selectbyData.find((i) => i.id === activeId);
    return (
      <div className="flex flex-col gap-2">
        {renderCheckboxData?.data.map((i) => {
          const avatar = "avatar" in i ? i?.avatar : "";
          const name = "surname" in i ? `${i.name} ${i?.surname}` : i.name;
          return (
            <div key={i.id + i.name} className="flex items-center gap-2">
              <CustomCheckbox
                checked={checkIfChecked(i.id, i.name)}
                icon={`${avatar}`}
                onChange={() => handleCeheckboxChange(i)}
                label={name}
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
              onClick={() => handleOpen(i.id)}
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
          <div className="pt-[40px] max-h-[400px] overflow-y-auto w-full px-[30px] pb-[20] absolute z-[9] top-[50px] bg-white border-[0.5px] border-[#8338EC] rounded-[10px]">
            <div>
              <RenderCheckbox />
            </div>
            <div className="w-full mt-[18px] flex justify-end">
              <Button btntype="fourth" onClick={() => handleChoose()}>
                არჩევა
              </Button>
            </div>
          </div>
        )}
      </div>

      {renderedData.length > 0 && (
        <div className="mt-[25px] flex flex-wrap gap-8 w-full">
          {renderedData.map((i) => (
            <button
              onClick={() => handeFilter(i)}
              className="py-[6px] px-[10px] border w-max items-center flex gap-1 border-[#CED4DA] rounded-[43px]"
              key={i.id + i.name}
            >
              <span className="font-[400] text-[14]">{i.name}</span>
              <div className="w-[14px] h-[14px] shrink-0">
                <Image src="x.svg" width={14} height={14} alt="close" />
              </div>
            </button>
          ))}
          <button
            className="cursor-pointer text-[14] font-400"
            onClick={() => resetAllData()}
          >
            გასუფთავება
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
