export interface StockAggregate {
  v: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
}

export interface StockAggregates {
  ticker: string;
  queryCount: number;
  resultsCount: number;
  adjusted: boolean;
  results: StockAggregate[];
  status: string;
  request_id: string;
  count: number;
}
