import './market.styles.scss';
import React, { FC, useState, useEffect, useRef } from 'react';
import CoinRow, { ICoinData } from '../../components/coinrow/coinrow.component';
import axios from 'axios';

const Market: FC = () => {
	const [coinData, setCoinData] = useState<ICoinData[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [sortField, setSortField] = useState<keyof ICoinData | null>(null);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const totalPages = Math.ceil(coinData.length / rowsPerPage);
	const indexOfLastCoin = currentPage * rowsPerPage;
	const indexOfFirstCoin = indexOfLastCoin - rowsPerPage;
	const currentCoins = coinData.slice(indexOfFirstCoin, indexOfLastCoin);
	const numOptions = [10, 20, 30, 40, 50];
	const dropdownRef = useRef(null);

	useEffect(() => {
		const fetchCoinData = async () => {
			const result = await axios(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false',
			);

			const mappedResult: ICoinData[] = result.data.map(
				(coin: any, index: number) => ({
					rank: index + 1,
					name: coin.name,
					image: coin.image,
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

	const handleNextPage = () => {
		if (currentPage < 5) setCurrentPage(currentPage + 1);
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber);
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

	const handleRowsChange = (event: any) => {
		setRowsPerPage(event.target.value);
		setCurrentPage(1);
	};

	return (
		<section id='market' className='market-section'>
			<div className='market-container'>
				<h1 className='title'>Market Update</h1>
				<div className='rows-dropdown-container'>
					<select
						className='rows-dropdown'
						ref={dropdownRef}
						onChange={handleRowsChange}
					>
						{numOptions.map((num) => (
							<option key={num} value={num}>
								{num} Rows
							</option>
						))}
					</select>
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
									const sortFieldMapping: { [key: string]: keyof ICoinData } = {
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
							{currentCoins.map((coinData, index) => (
								<CoinRow key={index} {...coinData} />
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className='pagination'>
				<button
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					className='prev-next'
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
						>
							{pageNumber}
						</button>
					),
				)}
				<button
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className='prev-next'
				>
					&gt;
				</button>
			</div>
		</section>
	);
};

export default Market;
