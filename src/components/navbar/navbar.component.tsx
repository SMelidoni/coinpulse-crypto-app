import './navbar.styles.scss';

import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const links = ['home', 'market', 'learn', 'social'];

const Navbar: FC = () => {
	const location = useLocation();
	const isDetailPage = location.pathname !== '/';

	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	if (isDetailPage) {
		return (
			<nav className='navbar-container'>
				<div className='navbar-name'>
					<RouterLink to='/' className='navbar-name-link'>
						{' '}
						<b>CoinPulse</b>
					</RouterLink>
				</div>
			</nav>
		);
	}

	return (
		<nav className='navbar-container'>
			<div className='navbar-name'>
				<ScrollLink
					className='navbar-name-link'
					to='home'
					smooth={true}
					offset={-70}
					duration={500}
				>
					<b>CoinPulse</b>
				</ScrollLink>
			</div>
			<button onClick={toggleMenu} className='menu-button'>
				☰
			</button>
			<div className='navbar-links'>
				{links.map((link) => (
					<ScrollLink
						key={link}
						activeClass='active'
						to={link}
						spy={true}
						smooth={true}
						offset={-70}
						duration={500}
					>
						{link.charAt(0).toUpperCase() + link.slice(1)}
					</ScrollLink>
				))}
			</div>
			<div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
				{menuOpen && (
					<>
						<button onClick={toggleMenu} className='close-button'>
							&times;
						</button>
						{links.map((link) => (
							<ScrollLink
								key={link}
								activeClass='active'
								to={link}
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
								onClick={toggleMenu}
							>
								{link.charAt(0).toUpperCase() + link.slice(1)}
							</ScrollLink>
						))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
