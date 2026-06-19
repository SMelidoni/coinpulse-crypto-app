import './fear-greed-index.styles.scss';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MdClose, MdInfoOutline } from 'react-icons/md';
import Footer from '../../pages/footer/footer.component';
import { getCachedData, getCachedJson } from '../../utils/api-cache';
import {
	FEAR_GREED_TTL_MS,
	FEAR_GREED_URL,
	FearGreedData,
	FearGreedResponse,
} from '../../utils/api-endpoints';

const sentimentSegments = [
	{ label: 'Extreme Fear', className: 'extreme-fear' },
	{ label: 'Fear', className: 'fear' },
	{ label: 'Neutral', className: 'neutral' },
	{ label: 'Greed', className: 'greed' },
	{ label: 'Extreme Greed', className: 'extreme-greed' },
];

const FearGreedIndex = () => {
	const cachedFearGreedData =
		getCachedData<FearGreedResponse>(FEAR_GREED_URL)?.data[0] ?? null;
	const [data, setData] = useState<FearGreedData | null>(cachedFearGreedData);
	const [countDown, setCountDown] = useState<number | null>(() =>
		cachedFearGreedData?.time_until_update
			? parseInt(cachedFearGreedData.time_until_update, 10)
			: null,
	);
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const infoPopoverRef = useRef<HTMLDivElement | null>(null);

	const timeInHMS = (seconds: number | null) => {
		if (!seconds) return;
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds - hours * 3600) / 60);
		const remainingSeconds = seconds - hours * 3600 - minutes * 60;
		return `${hours}h ${minutes}m ${remainingSeconds}s`;
	};

	const fetchData = useCallback(async () => {
		try {
			const response = await getCachedJson<FearGreedResponse>(FEAR_GREED_URL, {
				ttlMs: FEAR_GREED_TTL_MS,
			});
			const fearGreedData = response.data[0];
			setData(fearGreedData);
			if (fearGreedData.time_until_update) {
				setCountDown(parseInt(fearGreedData.time_until_update, 10));
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCountDown((prev) => (prev && prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if (countDown === 0) {
			fetchData();
		}
	}, [countDown, fetchData]);

	useEffect(() => {
		if (!isInfoOpen) {
			return;
		}

		const handlePointerDown = (event: MouseEvent) => {
			if (
				infoPopoverRef.current &&
				!infoPopoverRef.current.contains(event.target as Node)
			) {
				setIsInfoOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsInfoOpen(false);
			}
		};

		document.addEventListener('mousedown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isInfoOpen]);

	return (
		<div
			className={`fear-greed-index ${
				isInfoOpen ? 'info-open' : ''
			} ${data?.value_classification.replace(' ', '-')}`}
		>
			<div className='fear-greed-heading'>
				<h2>Fear & Greed Index</h2>
				<div className='fear-greed-info' ref={infoPopoverRef}>
					<button
						type='button'
						className='info-button'
						aria-label='Show Fear and Greed Index information'
						aria-expanded={isInfoOpen}
						aria-controls='fear-greed-info-panel'
						onClick={() => setIsInfoOpen((currentValue) => !currentValue)}
					>
						<MdInfoOutline aria-hidden />
					</button>
					{isInfoOpen && (
						<div
							id='fear-greed-info-panel'
							className='info-popover'
							role='dialog'
							aria-label='About the Fear and Greed Index'
						>
							<div className='info-popover-header'>
								<h3>What this means</h3>
								<button
									type='button'
									className='info-close-button'
									aria-label='Close information panel'
									onClick={() => setIsInfoOpen(false)}
								>
									<MdClose aria-hidden />
								</button>
							</div>
							<p>
								The index summarises crypto market sentiment on a 0 to 100
								scale.
							</p>
							<p>
								Lower values suggest fear. Higher values suggest greed. Treat it
								as context, not financial advice.
							</p>
						</div>
					)}
				</div>
			</div>
			<div className='fear-greed-value'>{data?.value}</div>
			{data && (
				<div className='fear-greed-status-pill'>
					{data.value} · {data.value_classification}
				</div>
			)}
			<div className='fear-greed-name'>
				<p>{data?.value_classification}</p>
			</div>
			{countDown !== null && <div>Next update in: {timeInHMS(countDown)}</div>}
			{data && (
				<div
					className='mobile-sentiment-guide'
					aria-label={`Current sentiment: ${data.value_classification}`}
				>
					{sentimentSegments.map((segment) => (
						<span
							key={segment.label}
							className={`mobile-sentiment-segment ${
								segment.className
							} ${
								data.value_classification === segment.label ? 'active' : ''
							}`}
							aria-hidden='true'
						></span>
					))}
				</div>
			)}
			<div className='color-guide-container'>
				<div className='color-guide'>
					{sentimentSegments.map((segment) => {
						const isActive = data?.value_classification === segment.label;

						return (
							<div
								key={segment.label}
								className={`color-guide-item ${isActive ? 'active' : ''}`}
								aria-current={isActive ? 'true' : undefined}
							>
								<span
									className={`color-box ${segment.className}`}
									aria-hidden='true'
								></span>
								{segment.label}
							</div>
						);
					})}
				</div>
			</div>
			<br />
			<Footer />
		</div>
	);
};

export default FearGreedIndex;
