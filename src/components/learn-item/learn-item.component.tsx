import './learn-item.styles.scss';

import React, { FC } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface LearnItemProps {
	question: string;
	answer: string;
	isOpen: boolean;
	onClick: () => void;
	emoji: string;
	itemId: string;
}

const LearnItem: FC<LearnItemProps> = ({
	question,
	answer,
	isOpen,
	onClick,
	emoji,
	itemId,
}) => {
	const buttonId = `${itemId}-button`;
	const answerId = `${itemId}-answer`;

	return (
		<div className={`query-item ${isOpen ? 'open' : ''}`}>
			<h2 className='crypto-question-heading'>
				<button
					id={buttonId}
					type='button'
					className='crypto-question'
					aria-expanded={isOpen}
					aria-controls={answerId}
					onClick={onClick}
				>
					<span className='crypto-question-copy'>
						<span className='crypto-emoji' aria-hidden='true'>
							{emoji}
						</span>
						{question}
					</span>
					<MdKeyboardArrowDown className='crypto-question-icon' aria-hidden />
				</button>
			</h2>
			<div
				id={answerId}
				role='region'
				aria-labelledby={buttonId}
				aria-hidden={!isOpen}
				className={`crypto-answer ${isOpen ? 'open' : ''}`}
			>
				{answer}
			</div>
		</div>
	);
};

export default LearnItem;
