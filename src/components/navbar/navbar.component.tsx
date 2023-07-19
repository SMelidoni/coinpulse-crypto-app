import './navbar.styles.scss';

import React, { FC, useState } from 'react';
import { Link } from 'react-scroll';

const links = ['home', 'market', 'learn', 'contact'];

const Navbar: FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<nav className='navbar-container'>
			<div className='navbar-name'>
				<Link
					className='navbar-name-link'
					to='home'
					smooth={true}
					offset={-70}
					duration={500}
				>
					<b>CoinPulse</b>
				</Link>
			</div>
			<button onClick={toggleMenu} className='menu-button'>
				☰
			</button>
			<div className='navbar-links'>
				{links.map((link) => (
					<Link
						key={link}
						activeClass='active'
						to={link}
						spy={true}
						smooth={true}
						offset={-70}
						duration={500}
					>
						{link.charAt(0).toUpperCase() + link.slice(1)}
					</Link>
				))}
			</div>
			<div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
				{menuOpen && (
					<>
						<button onClick={toggleMenu} className='close-button'>
							&times;
						</button>
						{links.map((link) => (
							<Link
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
							</Link>
						))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
