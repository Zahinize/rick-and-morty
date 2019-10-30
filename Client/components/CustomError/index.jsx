import React from 'react';
import PropTypes from 'prop-types';

const CustomError = ({ message, ...rest }) => (
	<div className="empty-state" {...rest}>
		<img src="/assets/images/error.png" alt="Error" />
		<h2>{message}</h2>
	</div>
);

CustomError.propTypes = {
	message: PropTypes.string
};

CustomError.defaultProps = {
	message: 'Oops! Seems like something is broken. Please check after some time.'
};

export default CustomError;
