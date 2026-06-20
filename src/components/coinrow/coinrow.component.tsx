import './coinrow.styles.scss';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollPosition } from '../../contexts/scroll-position-context';
import {
	formatCurrency,
	formatPercentage,
	getChangeClassName,
} from '../../utils/formatters';

export interface ICoinData {
	id: string;
	rank: number;
	name: string;
	image: string;
	price: number | null;
	change24h: number | null;
	volume24h: number | null;
	marketCap: number | null;
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

	const { setPosition } = useScrollPosition();

	const navigateToDetail = () => {
		setPosition(window.scrollY);
		navigate(`/${id}`, {
			state: { fromMarket: true, rowsPerPage, currentPage },
		});
	};

	const handleRowClick = () => {
		navigateToDetail();
	};

	const handleRowKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
		const isActivationKey =
			event.key === 'Enter' ||
			event.key === ' ' ||
			event.key === 'Spacebar' ||
			event.code === 'Space';

		if (!isActivationKey) {
			return;
		}

		event.preventDefault();
		navigateToDetail();
	};

	return (
		<tr
			className='coinrow'
			onClick={handleRowClick}
			role='button'
			tabIndex={0}
			aria-label={`View ${name} details`}
			onKeyDown={handleRowKeyDown}
		>
			<td>{rank}</td>
			<td>
				<div className='coin-container'>
					<img src={image} alt={name} className='coin-icon' />
					{name}
				</div>
			</td>
			<td>
				{formatCurrency(price, {
					minimumFractionDigits: 2,
				})}
			</td>
			<td className={getChangeClassName(change24h)}>
				{formatPercentage(change24h)}
			</td>
			<td>{formatCurrency(volume24h)}</td>
			<td>{formatCurrency(marketCap)}</td>
		</tr>
	);
};

export default CoinRow;
