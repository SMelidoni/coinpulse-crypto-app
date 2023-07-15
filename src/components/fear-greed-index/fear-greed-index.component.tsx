import './fear-greed-index.styles.scss';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type FearGreedData = {
	value: string;
	value_classification: string;
};

const FearGreedIndex = () => {
	const [data, setData] = useState<FearGreedData | null>(null);

	const url = `https://api.alternative.me/fng/?limit=0`;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(url);
				console.log(data);
				const fearGreedData: FearGreedData = response.data.data[0];
				setData(fearGreedData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [data, url]);

	return (
		<div
			className={`fear-greed-index ${data?.value_classification.replace(
				' ',
				'-',
			)}`}
		>
			<h2>Fear & Greed Index</h2>
			<div className='fear-greed-value'>{data?.value}</div>
			<div className='fear-greed-name'>
				<p>{data?.value_classification}</p>
			</div>
		</div>
	);
};

export default FearGreedIndex;
