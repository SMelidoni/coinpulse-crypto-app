import './fear-greed-index.styles.scss';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

type FearGreedData = {
	value: string;
	value_classification: string;
	time_until_update: string;
};

const FearGreedIndex = () => {
	const [data, setData] = useState<FearGreedData | null>(null);
	const [countDown, setCountDown] = useState<number | null>(null);

	const url = `https://api.alternative.me/fng/?limit=0`;

	const timeInHMS = (seconds: number | null) => {
		if (!seconds) return;
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds - hours * 3600) / 60);
		const remainingSeconds = seconds - hours * 3600 - minutes * 60;
		return `${hours}h ${minutes}m ${remainingSeconds}s`;
	};

	const fetchData = useCallback(async () => {
		try {
			const response = await axios.get(url);
			const fearGreedData: FearGreedData = response.data.data[0];
			setData(fearGreedData);
			if (fearGreedData.time_until_update) {
				setCountDown(parseInt(fearGreedData.time_until_update));
			}
		} catch (error) {
			console.error(error);
		}
	}, [url]);

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
		</div>
	);
};

export default FearGreedIndex;
