import React, { Component } from 'react';
// import SearchGif from './SearchGif';

class Content extends Component {
	state = {};

	// toggleOverlay = (content = null) =>
	// 	this.setState(state => {
	// 		const { overlay } = state;
	// 		return {
	// 			overlay: {
	// 				show: !overlay.show,
	// 				content
	// 			}
	// 		};
	// 	});

	render() {
		// const { overlay } = this.state;

		return (
			<section className="u-width-full u-padding-v3">
				<section className="content">{/* <SearchGif toggleOverlay={this.toggleOverlay} /> */}</section>
			</section>
		);
	}
}

export default Content;
