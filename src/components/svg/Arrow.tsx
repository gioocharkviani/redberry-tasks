import React from "react";

interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
  stroke?: string;
}

const Arrow: React.FC<IconProps> = ({
  fill = "black",
  width = 18,
  height = 19,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.625 16.3587V0H8.375V16.3587L1.08333 8.75L0.25 9.61957L9 18.75L17.75 9.61957L16.9167 8.75L9.625 16.3587Z"
        fill={fill}
      />
    </svg>
  );
};

export default Arrow;
