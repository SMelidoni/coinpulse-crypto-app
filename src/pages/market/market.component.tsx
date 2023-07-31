import './market.styles.scss';
import React, { FC } from 'react';
import CoinRow, { ICoinData } from '../../components/coinrow/coinrow.component';

const sampleData: ICoinData[] = [
	{
		rank: 1,
		name: 'Bitcoin',
		price: 45000,
		change24h: 5.2,
		volume24h: 1000000,
		marketCap: 860000000,
	},
];

const Market: FC = () => (
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
						{sampleData.map((coinData, index) => (
							<CoinRow key={index} {...coinData} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	</section>
);

export default Market;
