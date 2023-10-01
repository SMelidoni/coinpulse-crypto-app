import './learn-item.styles.scss';

import React, { FC } from 'react';

interface LearnItemProps {
	question: string;
	answer: string;
	isOpen: boolean;
	onClick: () => void;
	emoji: string;
}

const LearnItem: FC<LearnItemProps> = ({
	question,
	answer,
	isOpen,
	onClick,
	emoji,
}) => (
	<div className='query-item' onClick={onClick}>
		<h2 className='crypto-question'>
			{' '}
			<span className='crypto-emoji'>{emoji}</span>
			{question}
		</h2>
		<div className={`crypto-answer ${isOpen ? 'open' : ''}`}>{answer}</div>
	</div>
);

export default LearnItem;
