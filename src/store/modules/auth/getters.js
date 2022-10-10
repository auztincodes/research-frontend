export default {
	getLoggedUser: (state) => state.loggedUser,
	isLoggedIn: (state) => state.isLoggedIn,
	getError: (state) => state.error,
	getLastSearchResult: (state) => state.lastSearchResult
};
