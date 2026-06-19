import './topbar.styles.scss';

import React, { FC, useEffect, useState } from 'react';
import { getCachedData, getCachedJson } from '../../utils/api-cache';
import {
	COINGECKO_GLOBAL_URL,
	GLOBAL_DATA_TTL_MS,
	TopbarData,
	TopbarResponse,
} from '../../utils/api-endpoints';
import { formatCompactCurrency } from '../../utils/formatters';

const Topbar: FC = () => {
	const [data, setData] = useState<TopbarData | null>(
		() => getCachedData<TopbarResponse>(COINGECKO_GLOBAL_URL)?.data ?? null,
	);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const response = await getCachedJson<TopbarResponse>(
					COINGECKO_GLOBAL_URL,
					{ ttlMs: GLOBAL_DATA_TTL_MS },
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
								Market Cap: {formatCompactCurrency(data.total_market_cap.gbp)}
							</div>
							<div className='data-item'>
								24h Vol: {formatCompactCurrency(data.total_volume.gbp)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Topbar;
