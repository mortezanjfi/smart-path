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

export default function PriceChart({}: Props) {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await services.getPrices({
        fsym: "BTC",
        tsym: "USD",
        limit: 10,
      });
      const data = response?.data?.Data?.Data;
      setChartData({
        labels: data?.map((entry: any) =>
          new Date(entry.time * 1000).toLocaleTimeString()
        ),
        datasets: [
          {
            label: "higher",
            data: data?.map((entry: any) => entry?.high),
            backgroundColor: "green",
            borderRadius: 4,
          },
          {
            label: "average",
            data: data?.map((entry: any) => (entry?.low + entry?.high) / 2),
            backgroundColor: "yellow",
            borderRadius: 4,
          },
          {
            label: "lower",
            data: data?.map((entry: any) => entry?.low),
            backgroundColor: "red",
            borderRadius: 4,
          },
        ],
      });
    } catch (error) {
      console.error("error fetching price data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <Bar data={chartData} />;
}
