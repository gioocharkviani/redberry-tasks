"use client";

import { useState } from "react";

const DropDownSelect = () => {
  const [dropped, setDropped] = useState(false);

  return (
    <div
      className={`p-[14px] relative w-full bg-white items-start border border-[#CED4DA]  rounded-[5px]`}
      style={{
        height: dropped ? "max-content" : "45px",
        transition: "height 1s ease-in-out",
      }}
    >
      <button
        className="flex justify-between w-full h-full gap-5 cursor-pointer"
        onClick={() => setDropped(!dropped)}
      >
        აირჩიეთ
      </button>

      <div
        className={`w-full top-[45px] mt-[10px] transition-all ease-in-out overflow-hidden ${
          dropped ? "opacity-100 h-max" : "opacity-0 h-0"
        }`}
        style={{
          transition: "opacity 0.3s ease-in, max-height 0.3s ease-in-out",
        }}
      >
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
        <div>test</div>
      </div>
    </div>
  );
};

export default DropDownSelect;
