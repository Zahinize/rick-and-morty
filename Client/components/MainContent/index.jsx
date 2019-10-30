import React, { Fragment } from 'react';
import Header from './Header';
import Content from './Content/index';
import Footer from './Footer';
import '../../scss/app/index.scss';

const MainContent = () => {
	return (
		<Fragment>
			<Header />
			<Content />
			<Footer />
		</Fragment>
	);
};

export default MainContent;
