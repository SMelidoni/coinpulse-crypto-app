import './App.scss';

import React from 'react';
import Home from './pages/home/home.component';
import FearGreedIndex from './components/fear-greed-index/fear-greed-index.component';

function App() {
	return (
		<div className='App'>
			<Home />
			<FearGreedIndex />
		</div>
	);
}

export default App;
