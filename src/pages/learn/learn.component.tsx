import './learn.styles.scss';
import React, { FC, useState, useRef, useEffect } from 'react';

const cryptoQuestions = [
	{
		question: 'What is Blockchain?',
		answer:
			'Blockchain is like a digital ledger where transactions are recorded in a secure, transparent, and unchangeable way. Imagine it as a chain of blocks, each holding a list of transactions.',
	},
	{
		question: 'What is Cryptocurrency?',
		answer:
			'Cryptocurrency is a type of digital or virtual money. Unlike traditional money, it is not physical and is secured using complex computer techniques called cryptography.',
	},
	{
		question: 'What is Bitcoin?',
		answer:
			'Bitcoin is the first and most well-known cryptocurrency. It’s a decentralised digital currency, meaning no central authority controls it, and transactions are directly between users.',
	},
	{
		question: 'How do I buy Cryptocurrency?',
		answer:
			'You can buy cryptocurrencies using online platforms called exchanges. Once purchased, you can store it in a digital wallet.',
	},
	{
		question: 'What is a Digital Wallet?',
		answer:
			'A digital wallet is like a virtual bank account. It allows you to send or receive cryptocurrencies and monitor your balance.',
	},
	{
		question: 'Why are Cryptocurrencies volatile?',
		answer:
			'Their value can change rapidly because of factors like news, regulations, adoption rates, and market speculation.',
	},
	{
		question: 'What is Mining?',
		answer:
			'Mining is a process where powerful computers solve complex problems. When they solve it, they are rewarded with new cryptocurrency coins. It’s also how new transactions are added to a blockchain.',
	},
	{
		question: 'What is an ICO?',
		answer:
			'ICO stands for Initial Coin Offering. It’s a way for new cryptocurrencies to raise funding. Think of it as a mix between a crowdfunding campaign and a stock market IPO.',
	},
	{
		question: 'Why use Cryptocurrencies?',
		answer:
			'Some people like the idea of a currency that isn’t controlled by governments. Others appreciate the anonymity in transactions. It can also be an investment or used for online transactions where cryptocurrencies are accepted.',
	},
	{
		question: 'Is Cryptocurrency safe?',
		answer:
			'Cryptocurrencies use strong cryptographic techniques for security. However, their safety can depend on how they’re used. While transactions are secure, investments can be risky due to market volatility. Additionally, one must be cautious of scams, secure their digital wallets, and use reputable exchanges.',
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
