import './topbar.styles.scss';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

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
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://api.coingecko.com/api/v3/global',
				);
				setData(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
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
