import './learn.styles.scss';
import React, { FC, useState, useRef, useEffect } from 'react';

const cryptoQuestions = [
	{
		question: 'What is Blockchain?',
		answer:
			'A blockchain is a distributed ledger that is completely open to anyone. They have an interesting property: once some data has been recorded inside a blockchain, it becomes very difficult to change it. This makes blockchains suitable for recording events, medical records, and other records management activities.',
	},
];

const Learn: FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const faqsRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (faqsRef.current && !faqsRef.current.contains(event.target as Node)) {
			setOpenIndex(null);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<section id='learn' className='learn-section'>
			<div className='learn-container'>
				<h1 className='title'>Learn</h1>
				<p className='sub-header'>
					Educational explanations about different concepts in the crypto world.
				</p>
				<div className='crypto-queries' ref={faqsRef}>
					{cryptoQuestions.map((cryptoQuestion, index) => (
						<div
							className='query-item'
							key={index}
							onClick={() => setOpenIndex(openIndex === index ? null : index)}
						>
							<h2 className='crypto-question'>{cryptoQuestion.question}</h2>
							<div
								className={`crypto-answer ${openIndex === index ? 'open' : ''}`}
							>
								{cryptoQuestion.answer}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Learn;
