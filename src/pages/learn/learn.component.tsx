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
					Educational explanations about different concepts in the crypto world.
				</p>
				<div className='crypto-queries' ref={faqsRef}>
					{cryptoQuestions.map((cryptoQuestion, index) => (
						<LearnItem
							key={cryptoQuestion.question}
							question={cryptoQuestion.question}
							answer={cryptoQuestion.answer}
							isOpen={openIndex === index}
							onClick={() => setOpenIndex(openIndex === index ? null : index)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Learn;
