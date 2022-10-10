export default {
	logout: (state) => {
		state.loggedUser = {};
		state.isLoggedIn = false;
	},
	setLoggedUser: (state, user) => {
		state.loggedUser = user;
	},
	loginSuccess: (state, data) => {
		state.loggedUser = data;
		state.isLoggedIn = true;
	},
	setLastSearchResult: (state, data) => {
		state.lastSearchResult = data;
	}
};
