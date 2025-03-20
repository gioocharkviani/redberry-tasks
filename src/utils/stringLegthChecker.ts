export const stringLegthChecker = ({
  min,
  max,
}: {
  min: number;
  max: number;
}) => [
  {
    text: `მინიმუმ ${min} სიმბოლო`,
    isValid: (value: string) => value.length >= min,
  },
  {
    text: `მაქსიმუმ ${max} სიმბოლო`,
    isValid: (value: string) => value.length <= max,
  },
];
