const fetchCharacterData = params => {
	const { API_URL } = params;

	const url = `${window.location.origin}/${API_URL}`;

	return fetch(url).then(response => response.json());
};

export { fetchCharacterData };
