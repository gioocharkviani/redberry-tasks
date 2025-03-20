"use client";
import React from "react";
import Check from "../svg/Check";
import Badge from "../svg/Badge";
import { InputProps } from "@/types";

const Textarea = ({
  label,
  badge,
  error,
  defaultValue,
  value = "",
  onChange,
  validator,
}: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-[#343A40] text-[14px] font-[500]">{label}</label>
      )}
      <div
        className={`relative flex items-center p-[10px] justify-between gap-2 min-h-[133px] py-[10px] rounded-[6px] border ${
          value && !error
            ? "border-[#08A508]"
            : error
            ? "border-[#FA4D4D]"
            : "border-[#CED4DA]"
        }`}
      >
        <textarea
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className={`w-full text-[14px] font-[350px] mt-[3px] min-h-[133px] outline-0 resize-none`}
        />
        {badge && (
          <div className="w-[18px] h-[18px] shrink-0">
            <Badge />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 mt-[8px]">
        {validator?.map(({ isValid, text }, i) => {
          return (
            <div key={i} className="flex items-center gap-[2px]">
              <Check
                stroke={`${
                  !error && !value
                    ? "#6C757D"
                    : value && isValid(value)
                    ? "#08A508"
                    : "#FA4D4D"
                }`}
              />
              <span
                className={`text-[10px] font-[350px] ${
                  !error && !value
                    ? "text-[#6C757D]"
                    : value && isValid(value)
                    ? "text-[#08A508]"
                    : "text-[#FA4D4D]"
                }`}
              >
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Textarea;
