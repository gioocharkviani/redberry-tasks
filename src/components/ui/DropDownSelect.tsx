"use client";

import { useState } from "react";

const DropDownSelect = () => {
  const [dropped, setDropped] = useState(true);
  return (
    <div
      className={`p-[14px] relative w-full bg-white items-start border border-[#CED4DA]  transition-all ease-in-out rounded-[5px] ${
        dropped ? "h-max " : "h-[45px]"
      }`}
    >
      <button
        className=" flex justify-between w-full h-full gap-5 cursor-pointer"
        onClick={() => setDropped(!dropped)}
      >
        აირჩიეთ
      </button>

      <div
        className={`w-full top-[45px] mt-[10px] transition-all duration-300 ${
          dropped ? "opacity-100 flex flex-col" : " opacity-0 hidden"
        }`}
      >
        test
      </div>
    </div>
  );
};

export default DropDownSelect;
