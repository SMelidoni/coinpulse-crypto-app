import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

// Temporarily disabled StrictMode during development to prevent double API calls.
// Uncomment before major releases or periodic checks.
// root.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// );

root.render(<App />);
