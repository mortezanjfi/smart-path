import React from "react";

enum COLORS_ENUM {
  blue,
  yellow,
  green,
}
type Props = {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  color: COLORS_ENUM;
};

const colors = {
  [COLORS_ENUM.blue]: "border-blue-500 checked:bg-blue-500",
  [COLORS_ENUM.yellow]: "border-yellow-500 checked:bg-yellow-500",
  [COLORS_ENUM.green]: "border-green-500 checked:bg-green-500",
};

export default function DetailPrice({ color, checked, onChange }: Props) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="average"
        checked={checked}
        onChange={onChange}
        className={`${colors[color]} w-5 h-5 appearance-none border-2 rounded-full checked:border-transparent focus:outline-none transition duration-200`}
      />
      <span>Average</span>
    </label>
  );
}
