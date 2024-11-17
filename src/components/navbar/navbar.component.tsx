import './navbar.styles.scss';

import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useScrollPosition } from '../../contexts/scroll-position-context';
import { MdMenu, MdClose } from 'react-icons/md';

const links = ['home', 'market', 'learn', 'social'];

const Navbar: FC = () => {
	const location = useLocation();
	const isDetailPage = location.pathname !== '/';

	const [menuOpen, setMenuOpen] = useState(false);
	const [activeLink, setActiveLink] = useState('home');

	useEffect(() => {
		setActiveLink('home');
	}, []);

	const { position } = useScrollPosition();

	const handleNameClick = () => {
		if (isDetailPage) {
			window.scrollTo(0, position);
		}
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	if (isDetailPage) {
		return (
			<nav className='navbar-container'>
				<div className='navbar-name' onClick={handleNameClick}>
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
				<MdMenu size={32} />
			</button>
			<div className='navbar-links'>
				{links.map((link) => (
					<ScrollLink
						key={link}
						className={link === activeLink ? 'active' : ''}
						activeClass='active'
						to={link}
						spy={true}
						smooth={true}
						offset={-70}
						duration={500}
						onSetActive={() => setActiveLink(link)}
					>
						{link.charAt(0).toUpperCase() + link.slice(1)}
					</ScrollLink>
				))}
			</div>
			<div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
				{menuOpen && (
					<>
						<button onClick={toggleMenu} className='close-button'>
							<MdClose size={32} />
						</button>
						{links.map((link) => (
							<ScrollLink
								key={link}
								className={link === activeLink ? 'active' : ''}
								activeClass='active'
								to={link}
								spy={true}
								smooth={true}
								offset={-70}
								duration={500}
								onSetActive={() => setActiveLink(link)}
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
