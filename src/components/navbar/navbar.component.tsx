import './navbar.styles.scss';

import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { MdMenu, MdClose } from 'react-icons/md';

const links = ['home', 'market', 'learn', 'social'];

const Navbar: FC = () => {
	const location = useLocation();
	const isDetailPage = location.pathname !== '/';

	const [menuOpen, setMenuOpen] = useState(false);
	const [activeLink, setActiveLink] = useState('home');

	useEffect(() => {
		if (isDetailPage) {
			setMenuOpen(false);
		}
	}, [isDetailPage]);

	useEffect(() => {
		if (isDetailPage) {
			return;
		}

		let animationFrameId = 0;
		const stickyHeaderOffset = 120;

		const updateActiveLink = () => {
			const currentLink =
				links.find((link) => {
					const sectionElement = document.getElementById(link);

					if (!sectionElement) {
						return false;
					}

					const sectionBounds = sectionElement.getBoundingClientRect();

					return (
						sectionBounds.top <= stickyHeaderOffset &&
						sectionBounds.bottom > stickyHeaderOffset
					);
				}) ??
				links.reduce((activeSection, link) => {
					const sectionElement = document.getElementById(link);

					if (!sectionElement) {
						return activeSection;
					}

					const sectionBounds = sectionElement.getBoundingClientRect();

					return sectionBounds.top <= stickyHeaderOffset
						? link
						: activeSection;
				}, 'home');

			setActiveLink(currentLink);
		};

		const scheduleActiveLinkUpdate = () => {
			window.cancelAnimationFrame(animationFrameId);
			animationFrameId = window.requestAnimationFrame(updateActiveLink);
		};

		scheduleActiveLinkUpdate();
		window.addEventListener('scroll', scheduleActiveLinkUpdate, {
			passive: true,
		});
		window.addEventListener('resize', scheduleActiveLinkUpdate);

		return () => {
			window.cancelAnimationFrame(animationFrameId);
			window.removeEventListener('scroll', scheduleActiveLinkUpdate);
			window.removeEventListener('resize', scheduleActiveLinkUpdate);
		};
	}, [isDetailPage]);

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
			<button
				type='button'
				onClick={toggleMenu}
				className='menu-button'
				aria-label='Open navigation menu'
				aria-expanded={menuOpen}
				aria-controls='mobile-navigation'
			>
				<MdMenu size={32} aria-hidden='true' />
			</button>
			<div className='navbar-links'>
				{links.map((link) => (
					<ScrollLink
						key={link}
						className={link === activeLink ? 'active' : ''}
						to={link}
						smooth={true}
						offset={-70}
						duration={500}
					>
						{link.charAt(0).toUpperCase() + link.slice(1)}
					</ScrollLink>
				))}
			</div>
			<div
				id='mobile-navigation'
				className={`mobile-menu ${menuOpen ? 'open' : ''}`}
			>
				{menuOpen && (
					<>
						<button
							type='button'
							onClick={toggleMenu}
							className='close-button'
							aria-label='Close navigation menu'
						>
							<MdClose size={32} aria-hidden='true' />
						</button>
						{links.map((link) => (
							<ScrollLink
								key={link}
								className={link === activeLink ? 'active' : ''}
								to={link}
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
