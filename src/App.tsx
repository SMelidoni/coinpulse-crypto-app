import './App.scss';
import React, { useEffect, useState } from 'react';
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

function AppContent() {
	const location = useLocation();
	const [marketRowsPerPage, setMarketRowsPerPage] = useState(10);
	const [marketCurrentPage, setMarketCurrentPage] = useState(1);
	const [position, setPosition] = useState(0);

	useEffect(() => {
		if (location.pathname === '/') {
			window.scrollTo(0, position);
		}
	}, [location.pathname, position]);

	return (
		<ScrollPositionContext.Provider value={{ position, setPosition }}>
			<div className='App'>
				<Topbar />
				<Navbar />
				<Routes>
					<Route path='/:name' element={<CryptoDetail />} />
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
