import React from "react";

interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
}

const MinArrow: React.FC<IconProps> = ({
  fill = "#4D596A",
  width = 8,
  height = 4,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 4L8 0H0L4 4Z" fill={fill} />
    </svg>
  );
};

export default MinArrow;
