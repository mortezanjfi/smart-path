import services from "@services";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";

interface ChartContextType {
  chartData: any;
  loading: boolean;
  error: boolean;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart error");
  }
  return context;
};

const ChartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await services.getPrices({
        fsym: "BTC",
        tsym: "USD",
        limit: 10,
      });
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
      setError(false);
    } catch (error) {
      console.error("error fetching data", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChartContext.Provider value={{ chartData, error, loading }}>
      {children}
    </ChartContext.Provider>
  );
};

export default {
  useChart,
  ChartProvider,
};
