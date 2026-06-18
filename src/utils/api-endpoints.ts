export const COINGECKO_MARKETS_URL =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=50&page=1&sparkline=false';

export const COINGECKO_GLOBAL_URL =
	'https://api.coingecko.com/api/v3/global';

export const FEAR_GREED_URL = 'https://api.alternative.me/fng/?limit=0';

export const MARKET_DATA_TTL_MS = 5 * 60 * 1000;
export const GLOBAL_DATA_TTL_MS = 5 * 60 * 1000;
export const COIN_DETAIL_TTL_MS = 30 * 60 * 1000;
export const FEAR_GREED_TTL_MS = 30 * 60 * 1000;

export type CoinData = {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number | null;
	price_change_percentage_24h: number | null;
	total_volume: number | null;
	market_cap: number | null;
	rank?: number;
	price?: number | null;
	change24h?: number | null;
	volume24h?: number | null;
	marketCap?: number | null;
};

export type CoinDetail = {
	id: string;
	name: string;
	symbol: string;
	description: {
		en: string;
	};
	image: {
		large: string;
	};
	market_data: {
		current_price: {
			gbp: number;
		};
		market_cap_rank: number;
		price_change_percentage_24h: number;
	};
};

export type TopbarData = {
	active_cryptocurrencies: number;
	markets: number;
	total_market_cap: {
		gbp: number;
	};
	total_volume: {
		gbp: number;
	};
};

export type TopbarResponse = {
	data: TopbarData;
};

export type FearGreedData = {
	value: string;
	value_classification: string;
	time_until_update: string;
};

export type FearGreedResponse = {
	data: FearGreedData[];
};

export const getCoinDetailUrl = (coinId: string) =>
	`https://api.coingecko.com/api/v3/coins/${coinId}`;
