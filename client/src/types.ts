export interface Response {
  status: Status;
  data:   Coin[];
}

export interface CoinQuery {
  limit: string | number,
  start: string | number
}

export type SortType = 'standard' | 'expensive' | 'cheap'

export interface SelectItems {
  value: string;
  title: string
}

export interface Coin {
  id:                               number;
  name:                             string;
  symbol:                           string;
  slug:                             string;
  num_market_pairs:                 number;
  date_added:                       Date;
  tags:                             string[];
  max_supply:                       number | null;
  circulating_supply:               number;
  total_supply:                     number;
  platform:                         Platform | null;
  cmc_rank:                         number;
  self_reported_circulating_supply: null;
  self_reported_market_cap:         null;
  tvl_ratio:                        null;
  last_updated:                     Date;
  quote:                            Quote;
}

export interface Platform {
  id:            number;
  name:          string;
  symbol:        string;
  slug:          string;
  token_address: string;
}

export interface Quote {
  USD: Usd;
}

export interface Usd {
  price:                    number;
  volume_24h:               number;
  volume_change_24h:        number;
  percent_change_1h:        number;
  percent_change_24h:       number;
  percent_change_7d:        number;
  percent_change_30d:       number;
  percent_change_60d:       number;
  percent_change_90d:       number;
  market_cap:               number;
  market_cap_dominance:     number;
  fully_diluted_market_cap: number;
  tvl:                      null;
  last_updated:             Date;
}

export interface Status {
  timestamp:     Date;
  error_code:    number;
  error_message: null;
  elapsed:       number;
  credit_count:  number;
  notice:        null;
  total_count:   number;
}
