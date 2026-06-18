import './fear-greed-index.styles.scss';

import React, { useEffect, useState, useCallback } from 'react';
import Footer from '../../pages/footer/footer.component';
import { getCachedData, getCachedJson } from '../../utils/api-cache';
import {
	FEAR_GREED_TTL_MS,
	FEAR_GREED_URL,
	FearGreedData,
	FearGreedResponse,
} from '../../utils/api-endpoints';

const FearGreedIndex = () => {
	const cachedFearGreedData =
		getCachedData<FearGreedResponse>(FEAR_GREED_URL)?.data[0] ?? null;
	const [data, setData] = useState<FearGreedData | null>(cachedFearGreedData);
	const [countDown, setCountDown] = useState<number | null>(() =>
		cachedFearGreedData?.time_until_update
			? parseInt(cachedFearGreedData.time_until_update)
			: null,
	);

	const timeInHMS = (seconds: number | null) => {
		if (!seconds) return;
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds - hours * 3600) / 60);
		const remainingSeconds = seconds - hours * 3600 - minutes * 60;
		return `${hours}h ${minutes}m ${remainingSeconds}s`;
	};

	const fetchData = useCallback(async () => {
		try {
			const response = await getCachedJson<FearGreedResponse>(FEAR_GREED_URL, {
				ttlMs: FEAR_GREED_TTL_MS,
			});
			const fearGreedData = response.data[0];
			setData(fearGreedData);
			if (fearGreedData.time_until_update) {
				setCountDown(parseInt(fearGreedData.time_until_update));
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountDown((prev) => (prev && prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if (countDown === 0) {
			fetchData();
		}
	}, [countDown, fetchData]);

	return (
		<div
			className={`fear-greed-index ${data?.value_classification.replace(
				' ',
				'-',
			)}`}
		>
			<h2>
				Fear & Greed Index
				<div className='tooltip'>
					<div className='info-circle'>i</div>
					<span className='tooltiptext'>
						The Fear & Greed Index offers insight into the current mood of the
						cryptocurrency market. If the index shows 'Fear', it means many
						investors are worried, and it might be a good time to buy. On the
						other hand, if it points to 'Greed', it suggests people might be too
						excited, and the market could be overpriced potentially signaling a
						selling opportunity.
					</span>
				</div>
			</h2>
			<div className='fear-greed-value'>{data?.value}</div>
			<div className='fear-greed-name'>
				<p>{data?.value_classification}</p>
			</div>
			{countDown !== null && <div>Next update in: {timeInHMS(countDown)}</div>}
			<div className='color-guide-container'>
				<div className='color-guide'>
					<div>
						<span className='color-box extreme-fear-box'></span>Extreme Fear
					</div>
					<div>
						<span className='color-box fear-box'></span>Fear
					</div>
					<div>
						<span className='color-box neutral-box'></span>Neutral
					</div>
					<div>
						<span className='color-box greed-box'></span>Greed
					</div>
					<div>
						<span className='color-box extreme-greed-box'></span>Extreme Greed
					</div>
				</div>
			</div>
			<br />
			<Footer />
		</div>
	);
};

export default FearGreedIndex;
