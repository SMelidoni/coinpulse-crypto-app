import './crypto-detail.styles.scss';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
	ApiRequestError,
	getCachedData,
	getCachedJson,
} from '../../utils/api-cache';
import {
	COIN_DETAIL_TTL_MS,
	CoinDetail,
	getCoinDetailUrl,
} from '../../utils/api-endpoints';
import {
	formatCurrency,
	formatPercentage,
	getChangeClassName,
} from '../../utils/formatters';

const CryptoDetail: FC = () => {
	const navigate = useNavigate();
	const { name } = useParams<{ name?: string }>();
	const coinUrl = name ? getCoinDetailUrl(name.toLowerCase()) : null;

	const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(
		() => (coinUrl ? getCachedData<CoinDetail>(coinUrl) : null),
	);
	const [loading, setLoading] = useState(!coinDetail);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let isMounted = true;

		if (name && name === name.toLowerCase()) {
			const cachedCoinDetail = coinUrl
				? getCachedData<CoinDetail>(coinUrl)
				: null;

			setCoinDetail(cachedCoinDetail);
			setLoading(!cachedCoinDetail);
			setError(null);

			getCachedJson<CoinDetail>(getCoinDetailUrl(name), {
				ttlMs: COIN_DETAIL_TTL_MS,
			})
				.then((data) => {
					if (isMounted) {
						setCoinDetail(data);
						setLoading(false);
					}
				})
				.catch((error) => {
					if (!isMounted) {
						return;
					}

					setError(
						error instanceof ApiRequestError && error.status === 429
							? 'Too many requests. Please try again later.'
							: 'Failed to fetch coin data',
					);
					setLoading(false);
				});
		}

		return () => {
			isMounted = false;
		};
	}, [coinUrl, name]);

	if (!name) {
		return <div>Error: Name not provided.</div>;
	}

	if (name !== name.toLowerCase()) {
		navigate(`/${name.toLowerCase()}`);
		return null;
	}

	if (error) {
		return (
			<>
				<br />
				<div className='crypto-detail'>
					<div className='description-card'>
						<div>{error}</div>
					</div>
				</div>
			</>
		);
	}

	if (!coinDetail || loading) {
		return (
			<>
				<br />
				<div>Loading...</div>
			</>
		);
	}

	const capitalizeFirstLetter = (string: string): string => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const addNewTabSupportToLinks = (htmlContent: string) => {
		const domParser = new DOMParser();
		const documentContent = domParser.parseFromString(htmlContent, 'text/html');

		documentContent.querySelectorAll('a').forEach((anchor) => {
			anchor.setAttribute('target', '_blank');
			anchor.setAttribute('rel', 'noopener noreferrer');
		});

		return documentContent.body.innerHTML;
	};

	const cleanDescription = DOMPurify.sanitize(
		coinDetail?.description.en || 'No information available',
	);

	const enhancedDescription = addNewTabSupportToLinks(cleanDescription);

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
				<p>Price: {formatCurrency(coinDetail.market_data.current_price.gbp)}</p>
				<p>
					24h Change:{' '}
					<span
						className={getChangeClassName(
							coinDetail.market_data.price_change_percentage_24h,
							{
								increaseClassName: 'change-positive',
								decreaseClassName: 'change-negative',
								zeroClassName: 'change-positive',
							},
						)}
					>
						{formatPercentage(
							coinDetail.market_data.price_change_percentage_24h,
						)}
					</span>
				</p>
			</div>
			<div className='description-card'>
				<div
					className='description'
					dangerouslySetInnerHTML={{ __html: enhancedDescription }}
				></div>
			</div>
		</div>
	);
};

export default CryptoDetail;
