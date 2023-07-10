import './home.styles.scss';
import React, { FC, useState } from 'react';
import { useEffect, useRef } from 'react';

const Home: FC = () => {
	return (
		<section id='home' className='home-section'>
			<div className='home-container'>
				<h1>Track Cryptocurrencies</h1>
			</div>
		</section>
	);
};

export default Home;
