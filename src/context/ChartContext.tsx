import services from "@services";
import utils from "@utils";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  PropsWithChildren,
  useMemo,
} from "react";

type FiltersType = {
  higher: boolean;
  lower: boolean;
  average: boolean;
};

type HandleFiltersType = (name: keyof FiltersType, value: boolean) => void;
interface ChartContextType {
  filteredData: any;
  maxAndMinRange: { maxRange: number; minRange: number } | undefined;
  filters: FiltersType;
  setFilters: HandleFiltersType;
  loading: boolean;
  error: boolean;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

// hook for using context
const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart error");
  }
  return context;
};

// main provider
const ChartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [filters, setFilters] = useState({
    higher: true,
    lower: true,
    average: true,
  });
  const [chartData, setChartData] = useState<any>(null);
  const [apiPureData, setApiPureData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleFilters: HandleFiltersType = (name, value) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [name]: value };
      return updatedFilters;
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await services.getPrices({
        fsym: "BTC",
        tsym: "USD",
        limit: 10,
      });
      const options = {
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
      };
      setApiPureData(data);
      setChartData(options);
      setError(false);
    } catch (error) {
      console.error("error fetching data", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredData = useMemo(() => {
    const activeFilters = Object.entries(filters).filter(([_, value]) => value);

    return {
      ...chartData,
      datasets: chartData?.datasets?.filter((item: any) =>
        activeFilters.some(([filterKey]) => filterKey === item.label)
      ),
    };
  }, [filters, chartData]);

  const maxAndMinRange = useMemo(() => {
    return utils.findMaxAndMinRange(apiPureData);
  }, [apiPureData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChartContext.Provider
      value={{
        maxAndMinRange,
        filters,
        setFilters: handleFilters,
        filteredData,
        error,
        loading,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};

export default {
  useChart,
  ChartProvider,
};
