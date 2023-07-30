import './coinrow.styles.scss';
import React, { FC } from 'react';

export interface ICoinData {
	rank: number;
	name: string;
	price: number;
	change24h: number;
	volume24h: number;
	marketCap: number;
}

const CoinRow: FC<ICoinData> = ({
	rank,
	name,
	price,
	change24h,
	volume24h,
	marketCap,
}) => (
	<tr>
		<td>{rank}</td>
		<td>{name}</td>
		<td>£{price.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
		<td>{change24h.toFixed(2)}%</td>
		<td>£{volume24h.toLocaleString('en-GB')}</td>
		<td>£{marketCap.toLocaleString('en-GB')}</td>
	</tr>
);

export default CoinRow;