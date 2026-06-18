import React, { createContext, FC, useState, useEffect } from 'react';
import { ApiRequestError, getCachedJson } from '../utils/api-cache';

interface CoinData {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	price_change_percentage_24h: number;
	rank?: number;
	price?: number;
	change24h?: number;
	volume24h?: number;
	marketCap?: number;
}

interface CoinGeckoContextProps {
	coinData: CoinData[];
	errorMessage: string | null;
}

export const CoinGeckoContext = createContext<
	CoinGeckoContextProps | undefined
>(undefined);

interface CoinGeckoProviderProps {
	children: React.ReactNode;
}

const CoinGeckoProvider: FC<CoinGeckoProviderProps> = ({ children }) => {
	const [coinData, setCoinData] = useState<CoinData[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;
		const fetchURL =
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=50&page=1&sparkline=false';

		getCachedJson<CoinData[]>(fetchURL, { ttlMs: 5 * 60 * 1000 })
			.then((data) => {
				if (isMounted) {
					setCoinData(data);
				}
			})
			.catch((error) => {
				if (!isMounted) {
					return;
				}

				setErrorMessage(
					error instanceof ApiRequestError && error.status === 429
						? 'Too many requests. Please try again later.'
						: 'Unable to load market data. Please try again later.',
				);
			});

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<CoinGeckoContext.Provider value={{ coinData, errorMessage }}>
			{children}
		</CoinGeckoContext.Provider>
	);
};

export default CoinGeckoProvider;
