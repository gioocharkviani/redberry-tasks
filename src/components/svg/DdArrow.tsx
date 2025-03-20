import React from "react";

interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
  stroke?: string;
}

const DdArrow: React.FC<IconProps> = ({
  fill = "#343A40",
  width = 14,
  height = 8,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6199 1.7207L6.81655 5.52404C6.36738 5.9732 5.63238 5.9732 5.18322 5.52404L1.37988 1.7207"
        stroke={fill}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DdArrow;
