import './home.styles.scss';

import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollPosition } from '../../contexts/scroll-position-context';
import { CoinGeckoContext } from '../../contexts/coingecko-context';

const Home: FC = () => {
	const navigate = useNavigate();
	const { setPosition } = useScrollPosition();

	const context = useContext(CoinGeckoContext);

	if (!context) {
		throw new Error('Home component must be wrapped within CoinGeckoProvider');
	}

	const { coinData, errorMessage } = context;

	const handleCoinClick = (name: string) => {
		setPosition(window.scrollY);
		navigate(`/${name.toLowerCase()}`);
	};

	return (
		<section id='home' className='home-section'>
			<div className='home-container'>
				<h1 className='title'>CoinPulse Crypto App</h1>
				<p className='subtitle'>Insights into the World of Cryptocurrency</p>
				{errorMessage ? (
					<div className='error-message'>{errorMessage}</div>
				) : (
					<div className='coin-list'>
						{coinData.slice(0, 3).map((coin) => (
							<div
								key={coin.id}
								className='coin-item'
								onClick={() => handleCoinClick(coin.name)}
							>
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
				)}
			</div>
		</section>
	);
};

export default Home;
