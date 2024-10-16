import axios from "./axios-config";
import { GetPricesParamsType, GetVolumeParamsType } from "./types";

const getPrices = async (params: GetPricesParamsType) => {
  const cachedData = localStorage.getItem("prices");
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  const response = await axios.get(`/v2/histohour`, {
    params,
  });
  const data = response?.data?.Data?.Data;
  localStorage.setItem("prices", JSON.stringify(data));
  return data;
};

const getVolume = async (params: GetVolumeParamsType) => {
  return await axios.get(`/exchange/histohour`, {
    params,
  });
};

export default {
  getPrices,
  getVolume,
};
