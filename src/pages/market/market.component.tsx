import './market.styles.scss';
import React, { FC, useState, useEffect, useRef, useContext } from 'react';
import CoinRow, { ICoinData } from '../../components/coinrow/coinrow.component';
import { useLocation } from 'react-router-dom';
import { CoinGeckoContext } from '../../contexts/coingecko-context';

interface MarketProps {
	rowsPerPage: number;
	setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Market: FC<MarketProps> = ({
	rowsPerPage,
	setRowsPerPage,
	currentPage,
	setCurrentPage,
}) => {
	const [coinData, setCoinData] = useState<ICoinData[]>([]);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [sortField, setSortField] = useState<keyof ICoinData | null>(null);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const totalPages = Math.ceil(coinData.length / rowsPerPage);
	const indexOfLastCoin = currentPage * rowsPerPage;
	const indexOfFirstCoin = indexOfLastCoin - rowsPerPage;
	const currentCoins = coinData.slice(indexOfFirstCoin, indexOfLastCoin);
	const numOptions = [10, 20, 30, 40, 50];
	const dropdownRef = useRef<HTMLSelectElement | null>(null);

	const location = useLocation();
	const typedLocationState = location.state as {
		fromMarket: boolean;
		rowsPerPage: number;
		currentPage: number;
	};

	useEffect(() => {
		if (typedLocationState?.fromMarket) {
			setRowsPerPage(typedLocationState.rowsPerPage);
			setCurrentPage(typedLocationState.currentPage);
		}
	}, [typedLocationState, setCurrentPage, setRowsPerPage]);

	const context = useContext(CoinGeckoContext);

	if (!context) {
		throw new Error('Market component must be used within CoinGeckoProvider');
	}

	const { coinData: contextCoinData, errorMessage: contextErrorMessage } =
		context;

	useEffect(() => {
		if (contextCoinData && contextCoinData.length > 0) {
			const mappedResult: ICoinData[] = contextCoinData.map(
				(coin: any, index: number) => ({
					id: coin.id,
					rank: index + 1,
					name: coin.name,
					image: coin.image,
					price: coin.current_price,
					change24h: coin.price_change_percentage_24h,
					volume24h: coin.total_volume,
					marketCap: coin.market_cap,
					rowsPerPage,
					currentPage,
				}),
			);

			setCoinData(mappedResult);
		}
	}, [contextCoinData, rowsPerPage, currentPage]);

	const handleRowsChange = (event: any) => {
		setRowsPerPage(event.target.value);
		setCurrentPage(1);
	};

	const toggleDropdown = (event: React.MouseEvent<HTMLSelectElement>) => {
		event.stopPropagation();
		setDropdownOpen(!dropdownOpen);
	};

	const handleBlur = () => {
		setDropdownOpen(false);
	};

	const handleSort = (field: keyof ICoinData | null) => {
		if (!field) return;

		const newSortOrder =
			sortField === field ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';

		const sortedData = [...coinData].sort((a, b) => {
			if (field === 'name') {
				return newSortOrder === 'asc'
					? a[field].localeCompare(b[field])
					: b[field].localeCompare(a[field]);
			} else {
				return newSortOrder === 'asc'
					? (a[field] as number) - (b[field] as number)
					: (b[field] as number) - (a[field] as number);
			}
		});

		setSortField(field);
		setSortOrder(newSortOrder);
		setCoinData(sortedData);
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleNextPage = () => {
		if (currentPage < 5) setCurrentPage(currentPage + 1);
	};

	return (
		<section id='market' className='market-section'>
			<div className='market-container'>
				<h1 className='title'>Market Update</h1>
				{contextErrorMessage ? (
					<div className='error-message'>{contextErrorMessage}</div>
				) : (
					<>
						<div className='rows-dropdown-container'>
							<select
								className='rows-dropdown'
								ref={dropdownRef}
								onChange={handleRowsChange}
								onClick={toggleDropdown}
								onBlur={handleBlur}
								value={rowsPerPage}
							>
								{numOptions.map((num) => (
									<option key={num} value={num}>
										{num} Rows
									</option>
								))}
							</select>
							<span
								className={`dropdown-arrow ${dropdownOpen ? 'flipped' : ''}`}
							/>
						</div>
						<div className='table-container'>
							<table className='market-table'>
								<thead>
									<tr>
										{[
											'#',
											'Coin',
											'Price',
											'24h Change',
											'24h Volume',
											'Market Cap',
										].map((header, idx) => {
											const sortFieldMapping: {
												[key: string]: keyof ICoinData;
											} = {
												'#': 'rank',
												Coin: 'name',
												Price: 'price',
												'24h Change': 'change24h',
												'24h Volume': 'volume24h',
												'Market Cap': 'marketCap',
											};

											const currentSortField = sortFieldMapping[header];

											return (
												<th key={idx}>
													<div className='th-content'>
														{header}
														<span
															className='sort-arrows'
															onClick={() => handleSort(currentSortField)}
														>
															<div
																className={
																	sortField === currentSortField &&
																	sortOrder === 'asc'
																		? 'arrow-up active-arrow'
																		: 'arrow-up'
																}
															></div>
															<div
																className={
																	sortField === currentSortField &&
																	sortOrder === 'desc'
																		? 'arrow-down active-arrow'
																		: 'arrow-down'
																}
															></div>
														</span>
													</div>
												</th>
											);
										})}
									</tr>
								</thead>
								<tbody>
									{currentCoins.map((coinData) => (
										<CoinRow key={coinData.id} {...coinData} />
									))}
								</tbody>
							</table>
						</div>
						<div className='pagination'>
							<button
								onClick={handlePreviousPage}
								disabled={currentPage === 1}
								className='prev-next'
								aria-label='Previous page'
							>
								&lt;
							</button>
							{Array.from({ length: totalPages }, (_, index) => index + 1).map(
								(pageNumber) => (
									<button
										key={pageNumber}
										className={
											currentPage === pageNumber
												? 'page-number active-page'
												: 'page-number'
										}
										onClick={() => handlePageClick(pageNumber)}
										aria-label={`Page ${pageNumber}`}
										tabIndex={0}
									>
										{pageNumber}
									</button>
								),
							)}
							<button
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
								className='prev-next'
								aria-label='Next page'
							>
								&gt;
							</button>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default Market;
