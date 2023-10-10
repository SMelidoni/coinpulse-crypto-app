import './coinrow.styles.scss';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ICoinData {
	id: string;
	rank: number;
	name: string;
	image: string;
	price: number;
	change24h: number;
	volume24h: number;
	marketCap: number;
	rowsPerPage: number;
	currentPage: number;
}

const CoinRow: FC<ICoinData> = ({
	id,
	rank,
	name,
	image,
	price,
	change24h,
	volume24h,
	marketCap,
	rowsPerPage,
	currentPage,
}) => {
	const navigate = useNavigate();

	const navigateToDetail = () => {
		navigate(`/${id}`, {
			state: { fromMarket: true, rowsPerPage, currentPage },
		});
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
