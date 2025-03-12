"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Buttons";
import arrow from "../../publiC/arrow.svg";
import arrowdefault from "../../public/arrowdefault.svg";
import Image from "next/image";
import CustomCheckbox from "@/components/ui/CustomCheckbox"; // Import CustomCheckbox

const selectbyData = [
  {
    id: 1,
    name: "დეპარტამენტი",
    data: "departments",
  },
  {
    id: 2,
    name: "პრიორიტეტი",
    data: "priorities",
  },
  {
    id: 3,
    name: "თანამშრომელი",
    data: "employees",
  },
];

const TaskFilter = ({ filterBy }: { filterBy: any }) => {
  const [open, setOpen] = useState(false);
  const [activeButtonId, setActiveButtonId] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const handleOpen = (i: any) => {
    if (activeButtonId === i.id && open) {
      setOpen(false);
      setActiveButtonId(null);
    } else {
      setActiveButtonId(i.id);
      setOpen(true);
    }
  };

  const handleCheckboxChange = (item: any, isChecked: boolean) => {
    if (activeButtonId === 3) {
      if (isChecked) {
        setSelectedEmployee(item);
      } else {
        setSelectedEmployee(null);
      }
    } else {
      if (isChecked) {
        setSelectedItems((prevItems) => [...prevItems, item]);
      } else {
        setSelectedItems((prevItems) =>
          prevItems.filter((i) => i.id !== item.id)
        );
      }
    }
  };

  const renderFilterOptions = (filterType: string) => {
    const filterData = filterBy[filterType];

    return filterData.map((item: any) => (
      <div key={item.id} className="py-2">
        <CustomCheckbox
          label={item.name}
          icon={activeButtonId === 3 ? item.avatar : null}
          checked={
            activeButtonId === 3
              ? selectedEmployee?.id === item.id
              : selectedItems.some((i) => i.id === item.id)
          }
          onChange={(isChecked) => handleCheckboxChange(item, isChecked)}
        />
      </div>
    ));
  };

  const handleSelect = () => {
    setOpen(false);
    setActiveButtonId(null);
  };

  return (
    <div className="relative w-max mt-[52px] mb-[24px]">
      <div className="border flex items-center gap-[41px] border-[#DEE2E6] w-max rounded-[10px] h-[44px]">
        {selectbyData.map((i: any) => (
          <button
            onClick={() => handleOpen(i)}
            className={`py-[10px] flex gap-2 items-center px-[18px] text-[16px] font-[400] ${
              open && activeButtonId === i.id
                ? "text-[#8338EC]"
                : "text-[black]"
            }`}
            key={i.id}
          >
            {i.name}
            {open && activeButtonId == i.id ? (
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
            {renderFilterOptions(
              selectbyData.find((s: any) => s.id === activeButtonId)?.data
            )}
          </div>
          <div className="w-full mt-[18px] flex justify-end">
            <Button type="fourth" onClick={handleSelect}>
              არჩევა
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
