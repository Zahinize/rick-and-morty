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

function getCharacterLocationData(id, data) {
	const DEFAULT_DATA = {
		name: '',
		type: '',
		dimension: '',
		residentsCount: ''
	};

	if (!id) return DEFAULT_DATA;

	const filteredLocation = data.filter(object => object.id == id)[0];
	const { name, type, dimension, residents } = filteredLocation;
	const resultObject = {
		name,
		type,
		dimension,
		residentsCount: residents.length
	};

	return resultObject;
}

function getCharacterEpisodeData(idArray, data) {
	const isValidIdArray = !!(idArray && idArray.length);
	const DEFAULT_DATA = '';

	if (!isValidIdArray) return DEFAULT_DATA;

	const resultString = idArray
		.map(episodeId => {
			const filteredEpisode = data.filter(object => object.id == episodeId)[0];

			return filteredEpisode.name;
		})
		.join(', ');

	return resultString;
}

function getFinalCharacterData(inputData) {
	const { characters, locations, episodes } = inputData;

	return characters.reduce((accumulator, characterObject) => {
		const {
			id,
			name,
			status,
			species,
			gender,
			origin: { name: originName },
			location: { name: locationName },
			locationId,
			episodeId,
			image
		} = characterObject;
		const locationData = getCharacterLocationData(locationId, locations);
		const episodeData = getCharacterEpisodeData(episodeId, episodes);
		const resultObject = {
			id,
			name,
			status,
			species,
			gender,
			origin: originName,
			location: { ...locationData },
			episodes: episodeData,
			image
		};

		accumulator.push(resultObject);
		return accumulator;
	}, []);
}

function getLocationsAndEpisodes(inputData) {
	const locationParam = inputData.locations.join(',');
	const episodeParam = inputData.episodes.join(',');
	const locationPath = LOCATIONS.replace('__LOCATION_IDS__', locationParam);
	const episodePath = EPISODES.replace('__EPISODE_IDS__', episodeParam);
	const getLocationData = getData({ uri: locationPath });
	const getEpisodeData = getData({ uri: episodePath });

	return Promise.join(getLocationData, getEpisodeData, (allLocations, allEpisodes) => {
		inputData.locations = allLocations;
		inputData.episodes = allEpisodes;

		return inputData;
	});
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
		.then(getLocationsAndEpisodes)
		.then(getFinalCharacterData)
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
