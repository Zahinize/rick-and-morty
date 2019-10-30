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

function getUniqueNumbers(value, index, arr) {
	return arr.indexOf(value) === index;
}

function getTransformedData(inputData) {
	const resultObject = { characters: [], locations: [], episodes: [] };
	const locationRegex = /location\/[0-9]{1,5}/;

	inputData.results.forEach(characterData => {
		let character = { ...characterData };
		const isLocationUrl = !!character.location.url;

		const locationId = isLocationUrl ? character.location.url.match(locationRegex)[0].split('/')[1] : '';
		const episodeIds = character.episode.reduce((accumulator, episodeUrl) => {
			const episodeRegex = /episode\/[0-9]{1,5}/;
			const episodeId = episodeUrl.match(episodeRegex)[0].split('/')[1];

			accumulator.push(episodeId);
			return accumulator;
		}, []);

		character = { ...character, locationId, episodeId: episodeIds };
		resultObject.characters.push(character);
		isLocationUrl ? resultObject.locations.push(locationId) : null;
		resultObject.episodes = resultObject.episodes.concat(episodeIds);
	});

	resultObject.locations = resultObject.locations.filter(getUniqueNumbers);
	resultObject.episodes = resultObject.episodes.filter(getUniqueNumbers);
	return resultObject;
}

router.get('/getData', (req, res) => {
	const resultData = { data: [] };
	const getAllCharacters = getData({ uri: CHARACTERS });

	return getAllCharacters
		.then(getTransformedData)
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
