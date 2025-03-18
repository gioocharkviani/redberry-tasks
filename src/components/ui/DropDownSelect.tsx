"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import arrow from "../../../public/arrowdefault.svg";

const DropDownSelect = ({
  selected,
  children,
  label,
  error,
  defaultValue,
  errorText,
}: {
  selected?: string;
  children: React.ReactNode;
  label?: string;
  error?: boolean;
  errorText?: string;
  defaultValue?: string;
}) => {
  const [dropped, setDropped] = useState(false);
  useEffect(() => {
    setDropped(false);
  }, [selected]);
  return (
    <div className="w-full flex flex-col">
      {label && (
        <span className="text-[#343A40] text-[14px] font-[500]">{label}</span>
      )}
      <div
        className={`py-[0] relative w-full items-start bg-white  border rounded-[5px] ${
          error ? "border-[#FA4D4D]" : "border-[#CED4DA]"
        }`}
        style={{
          height: dropped ? "max-content" : "45px",
          transition: "height 1s ease-in-out",
        }}
      >
        <button
          className="flex px-[14px] py-[12px] justify-between items-center w-full h-[45px] gap-5 cursor-pointer"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            setDropped(!dropped);
          }}
        >
          <span>{selected || defaultValue}</span>
          <Image
            src={arrow}
            width={14}
            height={14}
            alt="arrow"
            className={`${
              dropped ? "rotate-180" : "rotate-0"
            } transition-all ease-in-out`}
          />
        </button>

        <div
          className={`w-full flex flex-col top-[45px] mt-[10px] transition-all ease-in-out overflow-hidden ${
            dropped ? "opacity-100 h-max" : "opacity-0 h-0"
          }`}
          style={{
            transition: "opacity 0.3s ease-in, max-height 0.3s ease-in-out",
          }}
        >
          {children}
        </div>
      </div>
      {errorText && error && (
        <div className="text-[#FA4D4D] text-[12px] mt-[4px]">{errorText}</div>
      )}
    </div>
  );
};

export default DropDownSelect;
