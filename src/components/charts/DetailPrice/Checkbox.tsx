import React from "react";

export enum COLORS_ENUM {
  red,
  yellow,
  green,
}
type Props = {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  color: COLORS_ENUM;
  name: string;
};

const colors = {
  [COLORS_ENUM.red]: "border-red-500 checked:bg-red-500",
  [COLORS_ENUM.yellow]: "border-yellow-500 checked:bg-yellow-500",
  [COLORS_ENUM.green]: "border-green-500 checked:bg-green-500",
};

// checkbox component
export default function Checkbox({ name, color, checked, onChange }: Props) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={`${colors[color]} w-5 h-5 appearance-none border-2 rounded-full checked:border-transparent focus:outline-none transition duration-200`}
      />
      <span className="first-letter:uppercase">{name}</span>
    </label>
  );
}
