import './App.scss';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom';

import Home from './pages/home/home.component';
import Navbar from './components/navbar/navbar.component';
import Topbar from './components/topbar/topbar.component';
import Market from './pages/market/market.component';
import Learn from './pages/learn/learn.component';
import FearGreedIndex from './components/fear-greed-index/fear-greed-index.component';
import CryptoDetail from './components/crypto-detail/crypto-detail.component';
import ScrollPositionContext from './contexts/scroll-position-context';
import CoinGeckoProvider from './contexts/coingecko-context';
import AppLoadingGate from './components/app-loading-gate/app-loading-gate.component';
import AppErrorBoundary from './components/app-error-boundary/app-error-boundary.component';

const RouteScrollHandler: React.FC<{ position: number }> = ({ position }) => {
	const location = useLocation();

	useLayoutEffect(() => {
		let secondAnimationFrameId = 0;
		const targetPosition = location.pathname === '/' ? position : 0;
		const scrollToTargetPosition = () => {
			window.scrollTo({
				top: targetPosition,
				left: 0,
				behavior: 'auto',
			});

			document.documentElement.scrollTop = targetPosition;
			document.body.scrollTop = targetPosition;
		};

		scrollToTargetPosition();

		// iOS Safari can adjust scroll after navigation/layout, so repeat the target scroll briefly.
		const firstAnimationFrameId = window.requestAnimationFrame(() => {
			scrollToTargetPosition();
			secondAnimationFrameId = window.requestAnimationFrame(
				scrollToTargetPosition,
			);
		});
		const timeoutId = window.setTimeout(scrollToTargetPosition, 100);

		return () => {
			window.cancelAnimationFrame(firstAnimationFrameId);
			window.cancelAnimationFrame(secondAnimationFrameId);
			window.clearTimeout(timeoutId);
		};
	}, [location.pathname, position]);

	return null;
};

function AppContent() {
	const location = useLocation();
	const [marketRowsPerPage, setMarketRowsPerPage] = useState(10);
	const [marketCurrentPage, setMarketCurrentPage] = useState(1);
	const [position, setPosition] = useState(0);

	useEffect(() => {
		const currentScrollRestoration = window.history.scrollRestoration;

		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}

		return () => {
			if ('scrollRestoration' in window.history) {
				window.history.scrollRestoration = currentScrollRestoration;
			}
		};
	}, []);

	return (
		<ScrollPositionContext.Provider value={{ position, setPosition }}>
			<AppErrorBoundary resetKey={`${location.pathname}${location.search}`}>
				<AppLoadingGate>
					<RouteScrollHandler position={position} />
					<div className='App'>
						<Topbar />
						<Navbar />
						<Routes>
							<Route path='/:coinId' element={<CryptoDetail />} />
							<Route
								path='/'
								element={
									<>
										<CoinGeckoProvider>
											<Home />
											<Market
												rowsPerPage={marketRowsPerPage}
												setRowsPerPage={setMarketRowsPerPage}
												currentPage={marketCurrentPage}
												setCurrentPage={setMarketCurrentPage}
											/>
										</CoinGeckoProvider>
										<Learn />
										<FearGreedIndex />
									</>
								}
							/>
						</Routes>
					</div>
				</AppLoadingGate>
			</AppErrorBoundary>
		</ScrollPositionContext.Provider>
	);
}

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	);
}

export default App;
