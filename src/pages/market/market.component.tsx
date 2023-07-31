import './market.styles.scss';
import React, { FC, useState, useEffect } from 'react';
import CoinRow, { ICoinData } from '../../components/coinrow/coinrow.component';
import axios from 'axios';

const Market: FC = () => {
	const [coinData, setCoinData] = useState<ICoinData[]>([]);

	useEffect(() => {
		const fetchCoinData = async () => {
			const result = await axios(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false',
			);

			const mappedResult: ICoinData[] = result.data.map(
				(coin: any, index: number) => ({
					rank: index + 1,
					name: coin.name,
					price: coin.current_price,
					change24h: coin.price_change_percentage_24h,
					volume24h: coin.total_volume,
					marketCap: coin.market_cap,
				}),
			);

			setCoinData(mappedResult);
		};

		fetchCoinData();
	}, []);

	return (
		<section id='market' className='market-section'>
			<div className='market-container'>
				<h1 className='title'>Market Update</h1>
				<div className='table-container'>
					<table className='market-table'>
						<thead>
							<tr>
								<th>#</th>
								<th>Coin</th>
								<th>Price</th>
								<th>24h Change</th>
								<th>24h Volume</th>
								<th>Market Cap</th>
							</tr>
						</thead>
						<tbody>
							{coinData.map((coinData, index) => (
								<CoinRow key={index} {...coinData} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default Market;
