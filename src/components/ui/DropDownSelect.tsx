"use client";

import { useEffect, useRef, useState } from "react";
import DdArrow from "../svg/DdArrow";
import Image from "next/image";

const DropDownSelect = ({
  disable,
  selected,
  children,
  label,
  error,
  defaultValue,
  errorText,
  iconSize,
  icon,
}: {
  selected?: string | number;
  children: React.ReactNode;
  label?: string;
  error?: boolean;
  errorText?: string;
  defaultValue?: string;
  disable?: boolean;
  icon?: string;
  iconSize?: "AVATAR" | "ICON";
}) => {
  const [dropped, setDropped] = useState(false);
  useEffect(() => {
    setDropped(false);
  }, [selected]);

  const boxRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setDropped(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-full flex flex-col" ref={boxRef}>
      {label && (
        <span
          className={`text-[#343A40] text-[14px] font-[500] ${
            disable ? "text-[#ADB5BD]" : ""
          }`}
        >
          {label}
        </span>
      )}
      <div
        className={`py-[0] relative w-full items-start bg-white  border rounded-[5px] ${
          !!error ? "border-[#FA4D4D]" : "border-[#CED4DA]"
        } ${disable ? "border-[#DEE2E6]" : ""}`}
        style={{
          height: dropped ? "max-content" : "45px",
          transition: "height 1s ease-in-out",
        }}
      >
        <button
          className="flex px-[14px] py-[12px] justify-between items-center w-full h-[45px] gap-5 cursor-pointer"
          disabled={disable}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            setDropped(!dropped);
          }}
        >
          <div className="flex items-center gap-2">
            {icon && (
              <div
                className={`w-[${iconSize === "AVATAR" ? 28 : 16}px] h-[${
                  iconSize === "AVATAR" ? 28 : 16
                }px] overflow-hidden ${
                  iconSize === "AVATAR"
                    ? "rounded-[100%] bg-gray-100"
                    : "rounded-0 bg-none"
                } flex items-center justify-center `}
              >
                <Image
                  width={iconSize === "AVATAR" ? 28 : 16}
                  height={iconSize === "AVATAR" ? 28 : 16}
                  alt=""
                  src={icon}
                />
              </div>
            )}
            <span className={`${disable ? "text-[#ADB5BD]" : ""}`}>
              {(!disable && selected) || defaultValue || ""}
            </span>
          </div>
          <div
            className={`transition-all ease-in-out  ${
              dropped ? "rotate-180" : ""
            }`}
          >
            <DdArrow fill={disable ? "#DEE2E6" : "#343A40"} />
          </div>
        </button>

        <div
          className={`w-full flex flex-col top-[45px] mt-[10px] transition-all ease-in-out overflow-hidden ${
            dropped ? "opacity-100 h-max" : "opacity-0 h-0"
          }`}
          style={{
            transition: "opacity 0.3s ease-in, max-height 0.3s ease-in-out",
          }}
        >
          <div className="max-h-[400px] h-max overflow-y-auto">{children}</div>
        </div>
      </div>
      {!!error && (
        <div className="text-[#FA4D4D] text-[12px] mt-[4px]">{errorText}</div>
      )}
    </div>
  );
};

export default DropDownSelect;
