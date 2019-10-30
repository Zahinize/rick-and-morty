const Promise = require('bluebird');
const request = require('request-promise');
const express = require('express');
const router = express.Router();
const {
	API_URLS: { CHARACTERS, LOCATIONS, EPISODES }
} = require('../configs/commonConsts');

function getData(options) {
	options = { ...options, json: true };
	return request(options);
}

router.get('/getData', (req, res) => {
	const resultData = { data: [] };
	const getAllCharacters = getData({ uri: CHARACTERS });

	return getAllCharacters
		.then(characterData => {
			resultData.data = characterData;
		})
		.catch(err => {
			console.log('GetData Error: While fetching data: ', err);
			return false;
		})
		.finally(() => res.json(resultData));
});

module.exports = router;
