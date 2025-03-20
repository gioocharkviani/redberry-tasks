"use client";
import React, { useState } from "react";
import CalendarSvg from "../svg/Calendar";
import Arrow from "../svg/Arrow";
import MinArrow from "../svg/minArrow";

interface Calendar {
  label?: string;
}

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const geoMonth = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემერი",
];

const Calendar = ({ label }: Calendar) => {
  const [selectedDate, setSelectedDate] = useState<string>("DD/MM/YYYY");

  const [openC, setOpenC] = useState<boolean>(false);
  const [openM, setOpenM] = useState<boolean>(false);
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentDay = date.getDate();

  const [selectDay, setSelectDay] = useState<number | null>(currentDay);
  const [selectMonth, setSelectMonth] = useState<number>(month);
  const [currentYear, setCurrentYear] = useState<number>(year);

  const daysInMonth = getDaysInMonth(selectMonth, currentYear);
  const prevDaysInMonth = getDaysInMonth(selectMonth - 1, currentYear);
  const nextDaysInMonth = getDaysInMonth(selectMonth + 1, currentYear) || 0;

  const firstDay = new Date(currentYear, selectMonth).getDay();
  function getDaysInMonth(month: number, year: number) {
    if (month < 0) {
      month = 11;
      year -= 1;
    } else if (month > 11) {
      month = 0;
      year += 1;
    }

    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  const lastDaysPrevMonth = prevDaysInMonth
    .reverse()
    .slice(0, firstDay)
    .reverse();

  const numb = 42 - (daysInMonth.length + firstDay);

  const daysNextMonth = nextDaysInMonth.slice(0, numb);

  const onMonthChange = (change: string) => {
    if (change === "PREV") {
      if (selectMonth === 0) {
        setCurrentYear(currentYear - 1);
        setSelectMonth(11);
      } else {
        setSelectMonth(selectMonth - 1);
      }
      setSelectDay(null);
    } else if (change === "NEXT") {
      if (selectMonth === 11) {
        setCurrentYear(currentYear + 1);
        setSelectMonth(0);
      } else {
        setSelectMonth(selectMonth + 1);
      }
      setSelectDay(null);
    }
  };

  const handleDateSelect = (day: number) => {
    setSelectDay(day);
  };

  const checkIfDisable = (day: number) => {
    if (selectMonth < month && currentYear === year) {
      return true;
    }
    if (selectMonth === month && currentYear === year && day < currentDay) {
      return true;
    }
    if (currentYear < year) {
      return true;
    }
    return false;
  };

  return (
    <div className="relative w-[318px]">
      {label && (
        <label className="text-[#343A40] text-[14px] font-[500]">{label}</label>
      )}
      <div
        onClick={() => setOpenC(true)}
        className={`w-full flex gap-[8px] cursor-pointer items-center h-[45px] bg-white rounded-[10px] p-[14px] border border-[#DEE2E6]`}
      >
        <CalendarSvg />
        <input
          className="text-[14px] text-[#ADB5BD] font-[400] outline-0"
          type="text"
          value={selectedDate}
          readOnly
        />
      </div>
      {openC && (
        <div className="w-full drop-shadow-sm flex flex-col gap-[22px] h-max p-[16px] bg-white rounded-[10px] mt-[6px] border border-[#DEE2E6]">
          <div className="flex justify-between gap-5">
            <div className="flex relative w-full">
              <button
                className="flex w-max items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenM(!openM);
                }}
              >
                <span className="font-[700] text-[13px]">
                  {geoMonth[selectMonth]} {currentYear}
                </span>
                <div className={`${openM ? "rotate-180" : ""}`}>
                  <MinArrow />
                </div>
              </button>
              {openM && (
                <div
                  className="bg-white absolute top-0 left-0 mt-[25px] rounded-[5px]
                  drop-shadow-sm p-[4px] w-full grid grid-cols-2 gap-2"
                >
                  {geoMonth.map((m, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectDay(null);
                        setOpenM(!openM);
                        setSelectMonth(i);
                      }}
                      className="text-[12px] text-start cursor-pointer font-[300]"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-[10px] items-center">
              <button
                className="rotate-180 shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onMonthChange("PREV");
                }}
              >
                <Arrow />
              </button>
              <button
                className="shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onMonthChange("NEXT");
                }}
              >
                <Arrow />
              </button>
            </div>
          </div>
          <div className="flex items-center flex-col justify-center">
            <div className="flex">
              {weekDays.map((wd, i) => (
                <span
                  className="flex  justify-center text-[14px] font-[400] items-center w-[32px] h-[32px]"
                  key={i}
                >
                  {wd}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {lastDaysPrevMonth.map((_, i) => {
                return (
                  <button
                    disabled
                    className={`flex justify-center text-[14px] font-[400] items-center w-[32px] h-[32px] text-[#bebebe] 
                        }`}
                    key={`blank-${i}`}
                  >
                    {_}
                  </button>
                );
              })}

              {daysInMonth.map((day, i) => (
                <button
                  disabled={checkIfDisable(day)}
                  title={
                    selectMonth < month
                      ? "თქვენ არ შეგიძლიათ მიუთითოთ დედლაინი წარსულიდან :)"
                      : ""
                  }
                  className={`flex rounded-[2px] justify-center text-[14px] font-[400] items-center w-[32px] h-[32px] ${
                    selectDay === day ? "bg-[#8338EC] text-white" : ""
                  } ${
                    checkIfDisable(day)
                      ? "cursor-not-allowed "
                      : "cursor-pointer"
                  } `}
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDateSelect(day);
                  }}
                >
                  {day}
                </button>
              ))}

              {daysNextMonth.map((_, i) => {
                return (
                  <button
                    disabled
                    className={`flex justify-center text-[14px] font-[400] items-center w-[32px] h-[32px] text-[#bebebe] 
                        }`}
                    key={`blank-${i}`}
                  >
                    {_}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenC(false);
              }}
              className="cursor-pointer text-[#8338EC] text-[13px] font-[400]"
            >
              Cancel
            </button>
            <button
              disabled={!selectDay}
              onClick={(e) => {
                e.preventDefault();
                const formattedDate = `${year}/${(selectMonth + 1)
                  .toString()
                  .padStart(2, "0")}/${selectDay?.toString().padStart(2, "0")}`;
                setSelectedDate(formattedDate);
                setOpenC(false);
              }}
              title={!selectDay ? "გთხოვთ აირჩიოთ თარიღი" : ""}
              className={` text-[#8338EC] text-[13px] font-[400] ${
                !selectDay ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
