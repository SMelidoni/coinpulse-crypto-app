// App.tsx
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

function App() {
	return (
		<div className='App'>
			<Topbar />
			<Navbar />
			<Router>
				<Routes>
					<Route path='/crypto/:name' element={<CryptoDetail />} />
					<Route
						path='/'
						element={
							<>
								<Home />
								<Market />
								<Learn />
								<FearGreedIndex />
							</>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
