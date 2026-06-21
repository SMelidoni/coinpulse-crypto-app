import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	COINGECKO_GLOBAL_URL,
	COINGECKO_MARKETS_URL,
	COIN_DETAIL_TTL_MS,
	CoinData,
	CoinDetail,
	FEAR_GREED_TTL_MS,
	FEAR_GREED_URL,
	FearGreedResponse,
	GLOBAL_DATA_TTL_MS,
	getCoinDetailUrl,
	MARKET_DATA_TTL_MS,
	TopbarResponse,
} from '../../utils/api-endpoints';
import { getCachedJson } from '../../utils/api-cache';

type AppLoadingGateProps = {
	children: React.ReactNode;
};

type LoadingState = 'loading' | 'ready' | 'error';

const MIN_LOADING_MS = 450;

const wait = (ms: number) =>
	new Promise((resolve) => {
		window.setTimeout(resolve, ms);
	});

const waitForFonts = async () => {
	if (!document.fonts) {
		return;
	}

	await Promise.all([
		document.fonts.load('400 16px Quicksand'),
		document.fonts.load('500 16px Quicksand'),
		document.fonts.load('600 16px Quicksand'),
		document.fonts.load('700 16px Quicksand'),
		document.fonts.ready,
	]);
};

const getApiPreloadRequests = (pathname: string) => {
	const requests: Promise<unknown>[] = [
		getCachedJson<TopbarResponse>(COINGECKO_GLOBAL_URL, {
			ttlMs: GLOBAL_DATA_TTL_MS,
		}),
	];

	if (pathname === '/') {
		requests.push(
			getCachedJson<CoinData[]>(COINGECKO_MARKETS_URL, {
				ttlMs: MARKET_DATA_TTL_MS,
			}),
			getCachedJson<FearGreedResponse>(FEAR_GREED_URL, {
				ttlMs: FEAR_GREED_TTL_MS,
			}),
		);
	} else {
		const coinId = pathname.replace(/^\/+/, '').toLowerCase();

		if (coinId) {
			requests.push(
				getCachedJson<CoinDetail>(getCoinDetailUrl(coinId), {
					ttlMs: COIN_DETAIL_TTL_MS,
				}),
			);
		}
	}

	return requests;
};

const AppLoadingScreen: FC<{
	state: LoadingState;
	onRetry: () => void;
}> = ({ state, onRetry }) => (
	<div className='app-loading-screen'>
		<div
			className='app-loading-panel'
			role={state === 'error' ? 'alert' : 'status'}
			aria-live='polite'
		>
			<div className='app-loading-mark' aria-hidden='true'>
				<span></span>
			</div>
			<div>
				<h1>CoinPulse</h1>
				<p>
					{state === 'error'
						? 'Unable to load live market data. This demo uses a public API, so requests may be temporarily rate limited.'
						: 'Loading live market data'}
				</p>
			</div>
			{state === 'error' ? (
				<button type='button' onClick={onRetry}>
					Try again
				</button>
			) : (
				<div className='app-loading-progress' aria-hidden='true'>
					<span></span>
				</div>
			)}
		</div>
	</div>
);

const AppLoadingGate: FC<AppLoadingGateProps> = ({ children }) => {
	const location = useLocation();
	const [state, setState] = useState<LoadingState>('loading');
	const [retryCount, setRetryCount] = useState(0);
	const loaderPreview = import.meta.env.DEV
		? new URLSearchParams(location.search).get('loader')
		: null;
	const forcedLoadingPreview =
		loaderPreview === 'true' || loaderPreview === 'loading';
	const forcedErrorPreview = loaderPreview === 'error';
	const isAppLoading = state !== 'ready';

	useEffect(() => {
		if (!isAppLoading) {
			return;
		}

		const previousBodyOverflow = document.body.style.overflow;
		const previousDocumentOverflow = document.documentElement.style.overflow;

		document.body.style.overflow = 'hidden';
		document.documentElement.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousBodyOverflow;
			document.documentElement.style.overflow = previousDocumentOverflow;
		};
	}, [isAppLoading]);

	useEffect(() => {
		let isMounted = true;
		const startedAt = Date.now();

		setState('loading');

		if (forcedLoadingPreview || forcedErrorPreview) {
			setState(forcedErrorPreview ? 'error' : 'loading');

			return () => {
				isMounted = false;
			};
		}

		const prepareApp = async () => {
			try {
				await Promise.all([
					waitForFonts(),
					...getApiPreloadRequests(location.pathname),
				]);

				const remainingLoadTime = MIN_LOADING_MS - (Date.now() - startedAt);

				if (remainingLoadTime > 0) {
					await wait(remainingLoadTime);
				}

				if (isMounted) {
					setState('ready');
				}
			} catch {
				if (isMounted) {
					setState('error');
				}
			}
		};

		prepareApp();

		return () => {
			isMounted = false;
		};
	}, [
		forcedErrorPreview,
		forcedLoadingPreview,
		location.pathname,
		retryCount,
	]);

	if (state !== 'ready') {
		return (
			<AppLoadingScreen
				state={state}
				onRetry={() => setRetryCount((currentCount) => currentCount + 1)}
			/>
		);
	}

	return <>{children}</>;
};

export default AppLoadingGate;
