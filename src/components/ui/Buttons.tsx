import React from "react";
import Image from "next/image";

//assets
import AddIcon from "../../../public/add.svg";
import Left from "../../../public/Left.svg";

type ButtonType = "first" | "second" | "third" | "fourth";

interface ButtonProps {
  type?: ButtonType;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "second",
  children,
  onClick,
  disabled,
  className = "",
}) => {
  const buttonStyles: Record<ButtonType, string> = {
    first:
      "border text-white text-[16px] h-[40px] rounded-[5px] flex items-center gap-[4px] py-[10px] px-[20px] bg-[#8338EC] hover:bg-[#B588F4]  transition-all group",
    second:
      "bg-white border text-black text-[16px] h-[40px] rounded-[5px] py-[10px] px-[20px] border-[#8338EC] hover:border-[#B588F4]  transition-all ",
    third:
      "flex items-center transition-all h-[26px] gap-[6px] hover:text-[#B588F4]  text-[#8338EC] text-[12px] group",
    fourth:
      "border text-white text-[16px] font-[400] h-[35px] rounded-[20px] px-[20px] bg-[#8338EC] hover:bg-[#B588F4]  transition-all",
  };

  const buttonClass = buttonStyles[type] || buttonStyles.second;

  return (
    <button
      disabled={disabled}
      className={`${buttonClass} ${className} relative ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      {type === "first" && (
        <Image
          src={AddIcon}
          width={20}
          height={20}
          alt="add"
          className="transition-opacity duration-300 opacity-100 group-hover:opacity-50"
        />
      )}
      {type === "third" && (
        <Image
          src={Left}
          width={16}
          height={16}
          alt="left"
          className="transition-opacity duration-300 opacity-100 group-hover:opacity-50"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
