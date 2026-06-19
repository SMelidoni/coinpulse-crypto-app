import './app-error-boundary.styles.scss';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { MdErrorOutline } from 'react-icons/md';

type AppErrorBoundaryProps = {
	children: ReactNode;
	resetKey: string;
};

type AppErrorBoundaryState = {
	error: Error | null;
	errorInfo: ErrorInfo | null;
};

class AppErrorBoundary extends Component<
	AppErrorBoundaryProps,
	AppErrorBoundaryState
> {
	state: AppErrorBoundaryState = {
		error: null,
		errorInfo: null,
	};

	static getDerivedStateFromError(error: Error): Partial<AppErrorBoundaryState> {
		return { error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		this.setState({ errorInfo });
		console.error('CoinPulse render error:', error, errorInfo);
	}

	componentDidUpdate(previousProps: AppErrorBoundaryProps) {
		if (
			this.state.error &&
			previousProps.resetKey !== this.props.resetKey
		) {
			this.setState({ error: null, errorInfo: null });
		}
	}

	handleReload = () => {
		window.location.reload();
	};

	render() {
		const { error, errorInfo } = this.state;

		if (!error) {
			return this.props.children;
		}

		return (
			<div className='app-error-screen'>
				<section className='app-error-panel' role='alert' aria-live='assertive'>
					<div className='app-error-mark' aria-hidden='true'>
						<MdErrorOutline />
					</div>
					<div>
						<p className='app-error-eyebrow'>CoinPulse</p>
						<h1>Something went wrong</h1>
						<p>
							Something unexpected happened while loading this page. Reload the
							page to try again.
						</p>
					</div>
					<div className='app-error-actions'>
						<button type='button' onClick={this.handleReload}>
							Reload page
						</button>
					</div>
					{import.meta.env.DEV && (
						<details className='app-error-details'>
							<summary>Developer details</summary>
							<pre>
								{error.message}
								{errorInfo?.componentStack}
							</pre>
						</details>
					)}
				</section>
			</div>
		);
	}
}

export default AppErrorBoundary;
