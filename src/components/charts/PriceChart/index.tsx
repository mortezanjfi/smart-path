import services from "@services";
import { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartContext from "@context/ChartContext";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {};
// price-chart component

export default function PriceChart({}: Props) {
  const { loading, error, filteredData } = ChartContext.useChart();

  if (error) return <div>error</div>;
  if (loading) return <div>Loading...</div>;

  return <Bar data={filteredData} />;
}
