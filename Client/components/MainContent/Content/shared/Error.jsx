import React from 'react';
import PropTypes from 'prop-types';

import Common from './Common';

const CustomError = props => <Common {...props} src="/assets/images/error.png" alt="Error" />;

CustomError.propTypes = { message: PropTypes.string };
CustomError.defaultProps = { message: 'Oops! Something went wrong.' };

export default CustomError;
