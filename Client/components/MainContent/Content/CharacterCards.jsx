import React, { Component, Fragment } from 'react';

import CardContainer from './CardContainer/index';
import Empty from './shared/Empty';
import Error from './shared/Error';
import Loader from './shared/Loader';
import { fetchCharacterData } from '../../../utils';
import { API_URL } from '../../../consts/index';

class CharacterCards extends Component {
	state = {
		results: [],
		isLoading: true,
		isError: false
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		return fetchCharacterData({
			API_URL
		})
			.then(response => {
				const { data } = response;

				this.setState({
					results: data,
					isLoading: false,
					isError: false
				});
			})
			.catch(error => {
				this.setState({ isLoading: false, isError: true });
			});
	};

	renderContent() {
		const { isLoading, isError, results } = this.state;

		if (isLoading) return <Loader />;
		else if (isError) return <Error />;
		else if (!results.length) return <Empty message="It's empty in here! No character found :(" />;

		return <CardContainer items={results} />;
	}

	render() {
		return <Fragment>{this.renderContent()}</Fragment>;
	}
}

export default CharacterCards;
