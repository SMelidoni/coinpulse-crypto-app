import './home.styles.scss';
import React, { FC, useState } from 'react';
import { useEffect, useRef } from 'react';

const Home: FC = () => {
	return (
		<section id='home' className='home-section'>
			<div className='home-container'>Track Cryptocurrencies</div>
		</section>
	);
};

export default Home;
