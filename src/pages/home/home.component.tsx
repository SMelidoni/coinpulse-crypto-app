import './home.styles.scss';
import React, { FC, useEffect, useState } from 'react';

interface CoinData {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	price_change_percentage_24h: number;
}

const Home: FC = () => {
	const [coins, setCoins] = useState<CoinData[]>([]);

	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=3&page=1',
		)
			.then((response) => response.json())
			.then((data) => setCoins(data));
	}, []);

	return (
		<section id='home' className='home-section'>
			<div className='home-container'>
				<h1 className='title'>Track Crypto-currencies</h1>
				<div className='coin-list'>
					{coins.map((coin) => (
						<div key={coin.id} className='coin-item'>
							<img src={coin.image} alt={coin.name} className='coin-image' />
							<h2>{coin.name}</h2>
							<div className='price-info'>
								<p>£{coin.current_price.toLocaleString()}</p>
								<span>|</span>
								<p
									className={
										coin.price_change_percentage_24h > 0
											? 'increase'
											: 'decrease'
									}
								>
									{coin.price_change_percentage_24h.toFixed(2)}%
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Home;
