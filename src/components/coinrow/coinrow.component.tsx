import './coinrow.styles.scss';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollPosition } from '../../contexts/scroll-position-context';

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

const isValidNumber = (value: number | null): value is number =>
	typeof value === 'number' && Number.isFinite(value);

const formatCurrency = (
	value: number | null,
	options?: Intl.NumberFormatOptions,
) => {
	if (!isValidNumber(value)) {
		return 'N/A';
	}

	return `£${value.toLocaleString('en-GB', options)}`;
};

const formatPercentage = (value: number | null) => {
	if (!isValidNumber(value)) {
		return 'N/A';
	}

	return `${value.toFixed(2)}%`;
};

const getChangeClassName = (value: number | null) => {
	if (!isValidNumber(value)) {
		return 'neutral';
	}

	return value > 0 ? 'increase' : 'decrease';
};

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

	const navigateToDetail = (rowsPerPage: number, currentPage: number) => {
		navigate(`/${id}`, {
			state: { fromMarket: true, rowsPerPage, currentPage },
		});
	};

	const handleRowClick = () => {
		setPosition(window.scrollY);
		navigateToDetail(rowsPerPage, currentPage);
	};

	return (
		<tr
			className='coinrow'
			onClick={handleRowClick}
			role='button'
			tabIndex={0}
			onKeyDown={(e) =>
				e.key === 'Enter' && navigateToDetail(rowsPerPage, currentPage)
			}
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
