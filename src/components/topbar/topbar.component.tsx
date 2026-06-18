import './topbar.styles.scss';

import React, { FC, useEffect, useState } from 'react';
import { getCachedJson } from '../../utils/api-cache';

type TopbarData = {
	active_cryptocurrencies: number;
	markets: number;
	total_market_cap: {
		gbp: number;
	};
	total_volume: {
		gbp: number;
	};
};

type TopbarResponse = {
	data: TopbarData;
};

const Topbar: FC = () => {
	const [data, setData] = useState<TopbarData | null>(null);

	const formatNumber = (num: number) => {
		if (num >= 1.0e12) return (num / 1.0e12).toFixed(2) + 'T';
		if (num >= 1.0e9) return (num / 1.0e9).toFixed(2) + 'B';
		if (num >= 1.0e6) return (num / 1.0e6).toFixed(2) + 'M';
		if (num >= 1.0e3) return (num / 1.0e3).toFixed(2) + 'K';
		return num.toFixed(2);
	};

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const response = await getCachedJson<TopbarResponse>(
					'https://api.coingecko.com/api/v3/global',
					{ ttlMs: 5 * 60 * 1000 },
				);
				if (isMounted) {
					setData(response.data);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className='topbar-container'>
			<div className='topbar-content'>
				<div className='data-content'>
					{data && (
						<>
							<div className='data-item'>
								Coins: {data.active_cryptocurrencies}
							</div>
							<div className='data-item'>Exchanges: {data.markets}</div>
							<div className='data-item'>
								Market Cap: £{formatNumber(data.total_market_cap.gbp)}
							</div>
							<div className='data-item'>
								24h Vol: £{formatNumber(data.total_volume.gbp)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Topbar;
