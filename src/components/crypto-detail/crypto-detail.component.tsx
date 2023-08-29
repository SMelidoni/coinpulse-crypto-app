import './crypto-detail.styles.scss';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
			<h1>{capitalizeFirstLetter(coinDetail.name)}</h1>
			<img src={coinDetail.image.large} alt={coinDetail.name} />
			<h2>{coinDetail.symbol.toUpperCase()}</h2>
			<p>Rank: #{coinDetail.market_data.market_cap_rank}</p>
			<p>Price: £{coinDetail.market_data.current_price.gbp.toLocaleString()}</p>
			<p>
				24h Change:{' '}
				{coinDetail.market_data.price_change_percentage_24h.toFixed(2)}%
			</p>
			<div className='description'>
				<p>
					{coinDetail.description.en
						? coinDetail.description.en
						: `No Description Available for ${coinDetail.name}`}
				</p>
			</div>
		</div>
	);
};

export default CryptoDetail;
