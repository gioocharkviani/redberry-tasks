import React from "react";

interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
  stroke?: string;
}

const Check: React.FC<IconProps> = ({
  fill = "none",
  width = 14,
  height = 10,
  stroke = "#86868A",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 10"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3327 1L4.99935 8.33333L1.66602 5"
        stroke={stroke}
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Check;
