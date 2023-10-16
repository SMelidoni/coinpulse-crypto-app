import './learn.styles.scss';
import React, { FC, useState, useRef, useEffect } from 'react';
import { cryptoQuestions } from '../../data/crypto-questions';
import LearnItem from '../../components/learn-item/learn-item.component';

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
					Click on a topic below to explore key concepts in the crypto world:
				</p>

				<div className='crypto-queries' ref={faqsRef}>
					{cryptoQuestions.map((cryptoQuestion, index) => (
						<LearnItem
							key={cryptoQuestion.question}
							question={cryptoQuestion.question}
							answer={cryptoQuestion.answer}
							isOpen={openIndex === index}
							onClick={() => setOpenIndex(openIndex === index ? null : index)}
							emoji={cryptoQuestion.emoji}
						/>
					))}
				</div>
			</div>
			<div className='quiz-container'>
				<h1 className='title'>Quiz</h1>
				<p className='sub-header'>
					Test your knowledge on crypto with our interactive quiz.
				</p>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a
					// href='https://link-to-your-quiz.com'
					target='_blank'
					rel='noopener noreferrer'
					className='quiz-link'
				>
					{/* Take the Quiz */}
					Coming Soon
				</a>
			</div>
			<br />
		</section>
	);
};

export default Learn;
