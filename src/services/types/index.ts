type CryptoDefaultParams = {
  tsym: string;
  limit: number;
};
export type GetPricesParamsType = CryptoDefaultParams & {
  fsym: string;
};

export type GetVolumeParamsType = CryptoDefaultParams;
