import React from "react";
import Check from "../svg/Check";
import Badge from "../svg/Badge";

interface reqFilds {
  text: string;
}

interface Input {
  label?: string;
  badge?: boolean;
  error?: boolean;
  errorText?: string;
  requiredFilds?: reqFilds[];
}

const Input = ({ label, badge, error, errorText, requiredFilds }: Input) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-[#343A40] text-[14px] font-[500]">{label}</label>
      )}
      <div className="relative flex items-center p-[10px] justify-between gap-2 h-[42px]  py-[10px] rounded-[6px] border border-[#CED4DA]">
        <input
          type="text"
          className="w-full text-[14px] font-[350px] mt-[3px] h-[42px] outline-0"
        />
        {badge && (
          <div className="w-[18px] h-[18px] shrink-0">
            <Badge />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 mt-[8px]">
        {requiredFilds?.map((_, index) => {
          return (
            <div key={index} className="flex items-center gap-[2px]">
              <Check stroke="green" />
              <span className="text-[10px] font-[350px] text-[#6C757D]">
                {_.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Input;
