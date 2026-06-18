import React, { createContext, FC, useState, useEffect } from 'react';
import {
	ApiRequestError,
	getCachedData,
	getCachedJson,
} from '../utils/api-cache';
import {
	COINGECKO_MARKETS_URL,
	CoinData,
	MARKET_DATA_TTL_MS,
} from '../utils/api-endpoints';

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
	const [coinData, setCoinData] = useState<CoinData[]>(
		() => getCachedData<CoinData[]>(COINGECKO_MARKETS_URL) ?? [],
	);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		getCachedJson<CoinData[]>(COINGECKO_MARKETS_URL, {
			ttlMs: MARKET_DATA_TTL_MS,
		})
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
