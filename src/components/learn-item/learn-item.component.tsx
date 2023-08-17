import './learn-item.styles.scss';

import React, { FC } from 'react';

interface LearnItemProps {
	question: string;
	answer: string;
	isOpen: boolean;
	onClick: () => void;
}

const LearnItem: FC<LearnItemProps> = ({
	question,
	answer,
	isOpen,
	onClick,
}) => (
	<div className='query-item' onClick={onClick}>
		<h2 className='crypto-question'>{question}</h2>
		<div className={`crypto-answer ${isOpen ? 'open' : ''}`}>{answer}</div>
	</div>
);

export default LearnItem;
