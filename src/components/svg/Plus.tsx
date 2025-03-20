import React from "react";

interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
}

const Plus: React.FC<IconProps> = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="0.75"
        width="16.5"
        height="16.5"
        rx="8.25"
        stroke="#8338EC"
        strokeWidth="1.5"
      />
      <path
        d="M9.576 8.456H13.176V9.656H9.576V13.304H8.256V9.656H4.656V8.456H8.256V4.808H9.576V8.456Z"
        fill="#8338EC"
      />
    </svg>
  );
};

export default Plus;
