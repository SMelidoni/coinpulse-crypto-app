import './crypto-detail.styles.scss';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

interface CoinDetail {
	id: string;
	name: string;
	symbol: string;
	description: {
		en: string;
	};
	image: {
		large: string;
	};
	market_data: {
		current_price: {
			gbp: number;
		};
		market_cap_rank: number;
		price_change_percentage_24h: number;
	};
}

const CryptoDetail: FC = () => {
	const navigate = useNavigate();
	const { name } = useParams<{ name?: string }>();

	const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null);

	useEffect(() => {
		if (name) {
			fetch(`https://api.coingecko.com/api/v3/coins/${name}`)
				.then((res) => res.json())
				.then((data) => setCoinDetail(data));
		}
	}, [name]);

	if (!name) {
		return <div>Error: Name not provided.</div>;
	}

	if (name !== name.toLowerCase()) {
		navigate(`/${name.toLowerCase()}`);
		return null;
	}

	const capitalizeFirstLetter = (string: string): string => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	if (!coinDetail) {
		return <div>Loading...</div>;
	}

	return (
		<div className='crypto-detail'>
			<div className='top-card'>
				<img src={coinDetail.image.large} alt={coinDetail.name} />
				<div className='name-rank'>
					<h1>{capitalizeFirstLetter(coinDetail.name)}</h1>
					<p>Rank: #{coinDetail.market_data.market_cap_rank}</p>
				</div>
			</div>
			<div className='stats-bar'>
				<p>Symbol: {coinDetail.symbol.toUpperCase()}</p>
				<p>
					Price: £{coinDetail.market_data.current_price.gbp.toLocaleString()}
				</p>
				<p>
					24h Change:{' '}
					<span
						className={
							coinDetail.market_data.price_change_percentage_24h >= 0
								? 'change-positive'
								: 'change-negative'
						}
					>
						{coinDetail.market_data.price_change_percentage_24h.toFixed(2)}%
					</span>
				</p>
			</div>
			<div className='description-card'>
				<div
					className='description'
					dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(
							coinDetail.description.en || 'No information available',
						),
					}}
				></div>
			</div>
		</div>
	);
};

export default CryptoDetail;
