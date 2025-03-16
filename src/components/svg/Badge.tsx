import React from "react";

interface IconProps {
  fill?: string;
  width?: number;
  height?: number;
}

const Badge: React.FC<IconProps> = ({
  fill = "#86868A",
  width = 18,
  height = 18,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.00734 17.055C8.53484 17.055 8.06984 16.8975 7.70234 16.5825L6.51734 15.57C6.39734 15.465 6.09734 15.36 5.93984 15.36H4.62734C3.51734 15.36 2.61734 14.46 2.61734 13.35V12.0675C2.61734 11.91 2.51234 11.61 2.41484 11.4975L1.39484 10.2975C0.779844 9.57001 0.779844 8.43001 1.39484 7.69501L2.41484 6.49501C2.51234 6.38251 2.61734 6.08251 2.61734 5.92501V4.65001C2.61734 3.54001 3.51734 2.64001 4.62734 2.64001H5.92484C6.08234 2.64001 6.37484 2.52751 6.50234 2.42251L7.68734 1.41001C8.42234 0.787506 9.56984 0.787506 10.3048 1.41001L11.4898 2.42251C11.6098 2.52751 11.9173 2.63251 12.0748 2.63251H13.3498C14.4598 2.63251 15.3598 3.53251 15.3598 4.64251V5.91751C15.3598 6.07501 15.4723 6.36751 15.5773 6.49501L16.5898 7.68001C17.2198 8.42251 17.2123 9.57001 16.5898 10.2975L15.5773 11.4825C15.4723 11.61 15.3673 11.9025 15.3673 12.06V13.335C15.3673 14.445 14.4673 15.345 13.3573 15.345H12.0823C11.9248 15.345 11.6323 15.4575 11.4973 15.5625L10.3123 16.575C9.94484 16.8975 9.47234 17.055 9.00734 17.055ZM4.62734 3.76501C4.13984 3.76501 3.74234 4.16251 3.74234 4.65001V5.92501C3.74234 6.35251 3.54734 6.89251 3.26984 7.22251L2.24984 8.42251C1.99484 8.73001 1.99484 9.27001 2.24984 9.57001L3.26234 10.7625C3.53234 11.07 3.73484 11.6325 3.73484 12.06V13.3425C3.73484 13.83 4.13234 14.2275 4.61984 14.2275H5.92484C6.34484 14.2275 6.89984 14.43 7.22984 14.7075L8.42234 15.7275C8.72984 15.99 9.26984 15.99 9.57734 15.7275L10.7623 14.715C11.0998 14.43 11.6473 14.235 12.0673 14.235H13.3423C13.8298 14.235 14.2273 13.8375 14.2273 13.35V12.075C14.2273 11.655 14.4298 11.1075 14.7073 10.77L15.7273 9.57751C15.9898 9.27001 15.9898 8.73001 15.7273 8.42251L14.7148 7.23751C14.4298 6.90001 14.2348 6.35251 14.2348 5.93251V4.65001C14.2348 4.16251 13.8373 3.76501 13.3498 3.76501H12.0748C11.6473 3.76501 11.0923 3.56251 10.7623 3.28501L9.56984 2.26501C9.26234 2.00251 8.72984 2.00251 8.41484 2.26501L7.23734 3.28501C6.89984 3.56251 6.35234 3.76501 5.92484 3.76501H4.62734Z"
        fill={fill}
      />
      <path
        d="M9 12.6525C8.5875 12.6525 8.25 12.315 8.25 11.9025C8.25 11.49 8.58 11.1525 9 11.1525C9.4125 11.1525 9.75 11.49 9.75 11.9025C9.75 12.315 9.42 12.6525 9 12.6525Z"
        fill={fill}
      />
      <path
        d="M9 10.29C8.6925 10.29 8.4375 10.035 8.4375 9.7275V6.0975C8.4375 5.79 8.6925 5.535 9 5.535C9.3075 5.535 9.5625 5.79 9.5625 6.0975V9.72C9.5625 10.035 9.315 10.29 9 10.29Z"
        fill={fill}
      />
    </svg>
  );
};

export default Badge;
