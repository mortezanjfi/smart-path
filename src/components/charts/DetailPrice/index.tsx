import Checkbox, { COLORS_ENUM } from "./Checkbox";
import ChartContext from "@context/ChartContext";

type Props = {};
// bottom component

export default function DetailPrice({}: Props) {
  const { filters, setFilters, maxAndMinRange } = ChartContext.useChart();

  const handleChange = (e: any) => {
    const { name, checked } = e.target;
    setFilters(name, checked);
  };

  return (
    <div className="flex flex-col gap-4 p-6 h-full">
      <h1>Indexes</h1>
      <div className="grid grid-cols-3 flex-1 px-8 w-full">
        <div className="flex flex-col justify-around flex-1 items-start h-full">
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
        <div className="flex text-red-600 justify-center items-center flex-col">
          <span>Maximum Range:</span>
          <span>{maxAndMinRange?.maxRange}</span>
        </div>
        <div className="flex text-blue-600 justify-center items-center flex-col">
          <span>Minimum Range:</span>
          <span>{maxAndMinRange?.minRange}</span>
        </div>
      </div>
    </div>
  );
}
