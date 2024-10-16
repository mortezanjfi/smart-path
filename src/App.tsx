import PriceChart from "@components/charts/PriceChart";
import "./App.css";
import ChartContext from "@context/ChartContext";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 max-h-screen overflow-hidden flex items-center h-screen justify-center">
      <div className="grid w-full gap-6 grid-rows-2 h-full p-8 grid-cols-3 flex-1">
        <ChartContext.ChartProvider>
          <div className="col-span-2 bg-white rounded-md flex justify-center items-center">
            <PriceChart />
          </div>
          <div className="bg-white rounded-md"></div>
          <div className="bg-white rounded-md col-span-full"></div>
        </ChartContext.ChartProvider>
      </div>
    </div>
  );
}

export default App;
