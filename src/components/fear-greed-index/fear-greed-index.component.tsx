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
						The Fear & Greed Index is used to gauge the current sentiment of the
						cryptocurrency market. When the index is low (towards Fear), it
						indicates that investors are scared, potentially signifying a buying
						opportunity. Conversely, when the index is high (towards Greed),
						investors might be getting too greedy, which could indicate an
						overbought market. It's a tool to analyse potential market
						reversals.
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
