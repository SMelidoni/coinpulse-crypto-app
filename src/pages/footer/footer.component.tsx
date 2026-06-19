import './footer.styles.scss';

import React, { FC } from 'react';
import {
	FaInstagram,
	FaTwitter,
	FaFacebookF,
	FaDiscord,
	FaYoutube,
} from 'react-icons/fa';

const socialLinks = [
	{
		name: 'Instagram',
		icon: <FaInstagram />,
		link: 'https://www.instagram.com/',
	},
	{
		name: 'Twitter',
		icon: <FaTwitter />,
		link: 'https://twitter.com/',
	},
	{
		name: 'Facebook',
		icon: <FaFacebookF />,
		link: 'https://www.facebook.com/',
	},
	{
		name: 'Discord',
		icon: <FaDiscord />,
		link: 'https://discord.com/',
	},
	{
		name: 'YouTube',
		icon: <FaYoutube />,
		link: 'https://www.youtube.com/',
	},
];

const Footer: FC = () => {
	return (
		<section id='social' className='footer-section'>
			<p className='footer-disclaimer'>
				CoinPulse is a demo project for educational purposes only. Cryptocurrency
				data may be delayed, cached, or incomplete and should not be used for
				financial decisions.
			</p>
			<div className='footer-container'>
				{socialLinks.map((link) => (
					<a
						key={link.name}
						href={link.link}
						target='_blank'
						rel='noopener noreferrer'
						className='social-icon-link'
						aria-label={link.name}
					>
						{link.icon}
					</a>
				))}
			</div>
		</section>
	);
};

export default Footer;
