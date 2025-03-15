"use client";

import Image from "next/image";
import { useState } from "react";
import arrow from "../../../public/arrowdefault.svg";

const DropDownSelect = ({
  selected,
  children,
}: {
  selected: string;
  children: React.ReactNode;
}) => {
  const [dropped, setDropped] = useState(false);

  return (
    <div
      className={`py-[0] relative w-full bg-white items-start border border-[#CED4DA]  rounded-[5px]`}
      style={{
        height: dropped ? "max-content" : "45px",
        transition: "height 1s ease-in-out",
      }}
    >
      <button
        className="flex px-[14px] py-[12px] justify-between items-center w-full h-[45px] gap-5 cursor-pointer"
        onClick={() => setDropped(!dropped)}
      >
        <span>{selected}</span>
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
  );
};

export default DropDownSelect;
