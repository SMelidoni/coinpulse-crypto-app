import './market.styles.scss';
import React, { FC, useState, useEffect } from 'react';
import CoinRow, { ICoinData } from '../../components/coinrow/coinrow.component';
import axios from 'axios';

const Market: FC = () => {
	const [coinData, setCoinData] = useState<ICoinData[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	const coinsPerPage = 10;
	const indexOfLastCoin = currentPage * coinsPerPage;
	const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
	const currentCoins = coinData.slice(indexOfFirstCoin, indexOfLastCoin);

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
				{[1, 2, 3, 4, 5].map((pageNumber) => (
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
				))}
				<button
					onClick={handleNextPage}
					disabled={currentPage === 5}
					className='prev-next'
				>
					&gt;
				</button>
			</div>
		</section>
	);
};

export default Market;
