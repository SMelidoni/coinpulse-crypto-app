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
		link: 'http://localhost:3000/',
	},
	{
		name: 'Twitter',
		icon: <FaTwitter />,
		link: 'http://localhost:3000/',
	},
	{
		name: 'Facebook',
		icon: <FaFacebookF />,
		link: 'http://localhost:3000/',
	},
	{
		name: 'Discord',
		icon: <FaDiscord />,
		link: 'http://localhost:3000/',
	},
	{
		name: 'YouTube',
		icon: <FaYoutube />,
		link: 'http://localhost:3000/',
	},
];

const Footer: FC = () => {
	return (
		<section id='social' className='footer-section'>
			<div className='footer-container'>
				{socialLinks.map((link) => (
					<a
						key={link.name}
						href={link.link}
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
