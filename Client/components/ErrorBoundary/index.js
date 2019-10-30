import React from 'react';

import CustomError from '../CustomError/index';
import '../../scss/shared/_empty.scss';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	render() {
		const { hasError } = this.state;
		const { children } = this.props;

		if (hasError) {
			return (
				<div style={{ textAlign: 'center' }}>
					<CustomError />
					<p style={{ marginTop: '20px', fontSize: '16px' }}>
						To go back to Home Screen, please click{' '}
						<a href="/" title="Home Page">
							here
						</a>
						.
					</p>
				</div>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
