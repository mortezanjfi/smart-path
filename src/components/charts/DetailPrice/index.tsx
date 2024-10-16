import React, { useState } from "react";
import Checkbox, { COLORS_ENUM } from "./Checkbox";
import ChartContext from "@context/ChartContext";

type Props = {};

export default function DetailPrice({}: Props) {
  const { filters, setFilters } = ChartContext.useChart();

  const handleChange = (e: any) => {
    const { name, checked } = e.target;
    setFilters(name, checked);
  };

  return (
    <div className="flex justify-around items-center h-full">
      <Checkbox
        name="higher"
        color={COLORS_ENUM.green}
        checked={filters.higher}
        onChange={handleChange}
      />
      <Checkbox
        name="average"
        color={COLORS_ENUM.yellow}
        checked={filters.average}
        onChange={handleChange}
      />
      <Checkbox
        name="lower"
        color={COLORS_ENUM.red}
        checked={filters.lower}
        onChange={handleChange}
      />
    </div>
  );
}
