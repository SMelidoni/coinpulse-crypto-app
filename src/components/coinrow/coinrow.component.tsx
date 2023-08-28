import './coinrow.styles.scss';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ICoinData {
	rank: number;
	name: string;
	image: string;
	price: number;
	change24h: number;
	volume24h: number;
	marketCap: number;
}

const CoinRow: FC<ICoinData> = ({
	rank,
	name,
	image,
	price,
	change24h,
	volume24h,
	marketCap,
}) => {
	const navigate = useNavigate();

	const navigateToDetail = () => {
		navigate(`/${name.toLowerCase()}`);
	};

	return (
		<tr className='coinrow' onClick={navigateToDetail}>
			<td>{rank}</td>
			<td>
				<div className='coin-container'>
					<img src={image} alt={name} className='coin-icon' />
					{name}
				</div>
			</td>
			<td>£{price.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
			<td className={change24h > 0 ? 'increase' : 'decrease'}>
				{change24h.toFixed(2)}%
			</td>
			<td>£{volume24h.toLocaleString('en-GB')}</td>
			<td>£{marketCap.toLocaleString('en-GB')}</td>
		</tr>
	);
};

export default CoinRow;
