import './crypto-detail.styles.scss';

import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CryptoDetail: FC = () => {
	const navigate = useNavigate();
	const { name } = useParams<{ name?: string }>();

	if (!name) {
		return <div>Error: Name not provided.</div>;
	}

	if (name !== name.toLowerCase()) {
		navigate(`/${name.toLowerCase()}`);
		return null;
	}

	const capitalizeFirstLetter = (string: string): string => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<div>
			<h1>{capitalizeFirstLetter(name)}</h1>
		</div>
	);
};

export default CryptoDetail;
