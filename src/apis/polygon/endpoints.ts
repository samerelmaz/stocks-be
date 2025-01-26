export const endpoints = {
  getStockAggregates: (symbol: string, from: string, to: string) =>
    `/v2/aggs/ticker/${symbol}/range/1/hour/${from}/${to}?adjusted=true&sort=asc&limit=120`,
  getCompanyDetails: (symbol: string) => `/v3/reference/tickers/${symbol}`,
};
