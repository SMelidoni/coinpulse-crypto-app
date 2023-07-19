import './App.scss';

import React from 'react';
import Home from './pages/home/home.component';
import FearGreedIndex from './components/fear-greed-index/fear-greed-index.component';
import Navbar from './components/navbar/navbar.component';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Home />
			<FearGreedIndex />
		</div>
	);
}

export default App;
