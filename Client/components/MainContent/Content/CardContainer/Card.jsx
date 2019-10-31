import React, { Component } from 'react';
import Proptypes from 'prop-types';

class Card extends Component {
	renderImage(url) {
		return (
			<div className="card-image">
				<img src={url} alt="Character Image" role="img" />
			</div>
		);
	}

	renderRow(key, value, isNormalText) {
		const computedBottomMargin = isNormalText ? 'u-margin-b2' : 'u-margin-b4';
		const computedKey = isNormalText ? <b>{key}</b> : <h3 className="u-color-black">{key}</h3>;
		const computedValue = isNormalText ? (
			<span className="u-text-right">{value.toLowerCase()}</span>
		) : (
			<strong className="u-color-black">{value}</strong>
		);
		return (
			<div className={`aligner aligner--row ${computedBottomMargin}`}>
				<div className="aligner-item aligner-item--grow2 aligner aligner--hStart aligner--vCenter">
					{computedKey}
				</div>
				<div className="aligner-item aligner aligner--hEnd aligner--vCenter">{computedValue}</div>
			</div>
		);
	}

	renderContent(data) {
		const {
			name,
			id,
			status,
			species,
			gender,
			origin,
			location: { name: locationName, type: locationType, dimension: locationDimension, residentsCount },
			episodes
		} = data;
		const nameRow = this.renderRow(name, `#${id}`);
		const statusRow = this.renderRow('Status', status, true);
		const speciesRow = this.renderRow('Species', species, true);
		const genderRow = this.renderRow('Gender', gender, true);
		const originRow = this.renderRow('Origin', origin, true);
		const locationNameRow = locationName ? this.renderRow('Loc. Name', locationName, true) : null;
		const locationTypeRow = locationType ? this.renderRow('Loc. Type', locationType, true) : null;
		const locationDimensionRow = locationDimension
			? this.renderRow('Loc. Dimension', locationDimension, true)
			: null;
		const residentsRow = residentsCount ? this.renderRow('Residents', String(residentsCount), true) : null;
		const episodesRow = this.renderRow('Episodes', episodes, true);

		return (
			<div className="card-content u-block u-padding-3">
				{nameRow}
				{statusRow}
				{speciesRow}
				{genderRow}
				{originRow}
				{locationNameRow}
				{locationTypeRow}
				{locationDimensionRow}
				{residentsRow}
				{episodesRow}
			</div>
		);
	}

	render() {
		const { item } = this.props;
		const { image } = item;

		return (
			<div className="card aligner aligner--column u-margin-b4">
				{this.renderImage(image)} {this.renderContent(item)}
			</div>
		);
	}
}

Card.props = {
	item: Proptypes.object.isRequired
};

export default Card;
