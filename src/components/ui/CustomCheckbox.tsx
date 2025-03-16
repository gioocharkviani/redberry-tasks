import Image from "next/image";
import React from "react";
import checkedIcon from "../../../public/checked.svg";

interface CheckboxProps {
  label: string;
  icon?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckbox = ({ label, icon, checked, onChange }: CheckboxProps) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <label
      className="flex items-center gap-4 cursor-pointer"
      onClick={handleChange}
    >
      <div
        className={`w-[22px] h-[22px] border-[1.5px] rounded-[6px] flex justify-center items-center ${
          checked ? "border-[#8338EC]" : "border-gray-400"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="opacity-0 w-0 h-0"
        />
        {checked && (
          <Image src={checkedIcon} alt="checked" width={10} height={7} />
        )}
      </div>
      {icon && (
        <Image
          src={icon}
          alt="icon"
          width={28}
          height={28}
          className="w-7 h-7 rounded-full"
        />
      )}
      <span className="text-[16] font-[400]">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
