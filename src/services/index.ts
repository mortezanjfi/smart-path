import axios from "./axios-config";
import { GetPricesParamsType, GetVolumeParamsType } from "./types";

const getPrices = async (params: GetPricesParamsType) => {
  return await axios.get(`/v2/histohour`, {
    params,
  });
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
