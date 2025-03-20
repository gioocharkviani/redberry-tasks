import React from "react";

interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
}

const CalendarSvg: React.FC<IconProps> = ({
  fill = "#4D596A",
  width = 14,
  height = 14,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.00065 0.167969V1.5013H9.00065V0.167969H10.334V1.5013H13.0007C13.3689 1.5013 13.6673 1.79978 13.6673 2.16797V12.8346C13.6673 13.2028 13.3689 13.5013 13.0007 13.5013H1.00065C0.632464 13.5013 0.333984 13.2028 0.333984 12.8346V2.16797C0.333984 1.79978 0.632464 1.5013 1.00065 1.5013H3.66732V0.167969H5.00065ZM12.334 6.83463H1.66732V12.168H12.334V6.83463ZM3.66732 2.83464H1.66732V5.5013H12.334V2.83464H10.334V4.16797H9.00065V2.83464H5.00065V4.16797H3.66732V2.83464Z"
        fill={fill}
      />
    </svg>
  );
};

export default CalendarSvg;
