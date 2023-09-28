import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home/home.component';
import Navbar from './components/navbar/navbar.component';
import Topbar from './components/topbar/topbar.component';
import Market from './pages/market/market.component';
import Learn from './pages/learn/learn.component';
import FearGreedIndex from './components/fear-greed-index/fear-greed-index.component';
import CryptoDetail from './components/crypto-detail/crypto-detail.component';
import Footer from './pages/footer/footer.component';

function AppContent() {
	return (
		<div className='App'>
			<Topbar />
			<Navbar />
			<Routes>
				<Route path='/:name' element={<CryptoDetail />} />
				<Route
					path='/'
					element={
						<>
							<Home />
							<Market />
							<Learn />
							<FearGreedIndex />
							<Footer />
						</>
					}
				/>
			</Routes>
		</div>
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
