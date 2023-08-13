import './learn.styles.scss';
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Learn: FC = () => {
	const [openQuestion, setOpenQuestion] = useState<number | null>(null);

	const questionsAnswers = [
		{
			question: 'What is blockchain?',
			answer:
				'Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system.',
		},
		{
			question: 'What is another question?',
			answer: 'Here is the answer to another question.',
		},
	];

	return (
		<section id='learn' className='learn-section'>
			<div className='learn-container'>
				<h1 className='title'>Learn</h1>
				<p className='sub-header'>
					Educational explanations about different concepts in the crypto world.
				</p>

				{questionsAnswers.map((item, index) => (
					<div
						key={index}
						className={`faq-item ${index === openQuestion ? 'open' : ''}`}
					>
						<div className='qa-container'>
							<button
								className='question'
								onClick={() =>
									setOpenQuestion(index === openQuestion ? null : index)
								}
							>
								{item.question}
								<FontAwesomeIcon
									icon={index === openQuestion ? faChevronUp : faChevronDown}
									className={`arrow ${index === openQuestion ? 'open' : ''}`}
								/>
							</button>
							{index === openQuestion ? (
								<p className={`answer open`}>{item.answer}</p>
							) : (
								<p className='answer'>{item.answer}</p>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Learn;
