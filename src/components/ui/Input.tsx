import React from "react";
import Check from "../svg/Check";
import Badge from "../svg/Badge";

interface reqFilds {
  text: string;
  id: number;
}

interface InputProps {
  label?: string;
  badge?: boolean;
  error?: boolean;
  errorText?: string;
  requiredFilds?: reqFilds[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

const Input = ({
  label,
  badge,
  requiredFilds,
  error,
  defaultValue,
  errorText,
  value = "",
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="text-[#343A40] text-[14px] font-[500]">{label}</label>
      )}
      <div
        className={`
          relative flex items-center p-[10px] justify-between gap-2 h-[42px] py-[10px] rounded-[6px] border ${
            value && !error
              ? "border-[#08A508]"
              : error
              ? "border-[#FA4D4D]"
              : !value && !error
              ? "border-[#CED4DA]"
              : ""
          }`}
      >
        <input
          type="text"
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className={`w-full text-[14px] font-[350px] mt-[3px] h-[42px] outline-0 `}
        />
        {badge && (
          <div className="w-[18px] h-[18px] shrink-0">
            <Badge />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 mt-[8px]">
        {requiredFilds?.map((_) => {
          return (
            <div key={_.id} className="flex items-center gap-[2px]">
              <Check
                stroke={`${
                  error ? "#FA4D4D" : value && !error ? "#08A508" : "#6C757D"
                }`}
              />
              <span
                className={`text-[10px] font-[350px] ${
                  value && !error
                    ? "text-[#08A508]"
                    : error
                    ? "text-[#FA4D4D]"
                    : "text-[#6C757D]"
                }`}
              >
                {_.text}
              </span>
            </div>
          );
        })}
        {errorText && (
          <div className="text-[#FA4D4D] text-[12px] mt-[4px]">{errorText}</div>
        )}
      </div>
    </div>
  );
};

export default Input;
