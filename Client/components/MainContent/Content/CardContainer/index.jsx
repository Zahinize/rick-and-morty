import React from 'react';
import PropTypes from 'prop-types';

import Empty from '../shared/Empty';
import Card from './Card';

const CardContainer = ({ items }) => {
	if (!items.length) return <Empty />;

	return (
		<div className="card-container aligner aligner--row aligner--wrap aligner--hSpaceBetween" role="grid">
			{items.map(item => {
				return <Card item={item} key={`card-container-${item.id}`} />;
			})}
		</div>
	);
};

CardContainer.propTypes = {
	items: PropTypes.array.isRequired
};

export default CardContainer;
