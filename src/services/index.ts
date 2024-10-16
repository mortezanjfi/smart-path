import utils from "@utils";
import axios from "./axios-config";
import { GetPricesParamsType, GetVolumeParamsType } from "./types";

const getPrices = async (params: GetPricesParamsType) => {
  const cachedData = utils.getLocalStorageItemWithExpireTime("prices");
  if (cachedData) {
    console.log("used cached data");
    return cachedData;
  }
  const response = await axios.get(`/v2/histohour`, {
    params,
  });
  const data = response?.data?.Data?.Data;
  utils.setLocalStorageItemWithExpireTime("prices", data, 3600000);
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
