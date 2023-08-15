import './App.scss';

import React from 'react';
import Home from './pages/home/home.component';
import Navbar from './components/navbar/navbar.component';
import Topbar from './components/topbar/topbar.component';
import Market from './pages/market/market.component';
import Learn from './pages/learn/learn.component';
import FearGreedIndex from './components/fear-greed-index/fear-greed-index.component';

function App() {
	return (
		<div className='App'>
			<Topbar />
			<Navbar />
			<Home />
			<Market />
			<Learn />
			<FearGreedIndex />
		</div>
	);
}

export default App;
