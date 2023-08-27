import './crypto-detail.styles.scss';

import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const CryptoDetail: FC = () => {
	const { name } = useParams<{ name: string }>();

	return (
		<div>
			<h1>{name}</h1>
		</div>
	);
};

export default CryptoDetail;
