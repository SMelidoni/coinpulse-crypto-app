import './learn.styles.scss';
import React, { FC, useState, useRef, useEffect } from 'react';

const faqs = [
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
				<div className='faqs' ref={faqsRef}>
					{faqs.map((faq, index) => (
						<div
							className='faq-item'
							key={index}
							onClick={() => setOpenIndex(openIndex === index ? null : index)}
						>
							<h2 className='faq-question'>{faq.question}</h2>
							<div
								className={`faq-answer ${openIndex === index ? 'open' : ''}`}
							>
								{faq.answer}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Learn;
