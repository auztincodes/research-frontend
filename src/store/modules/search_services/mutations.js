export default {
	saveSearchPayload: (state, data) => {
		state.searchPayload = data;
	},
	saveNotepad: (state, data) => {
		state.notepad = data;
	},
	saveSearchedItem: (state, data) => {
		state.searchedItem = data;
	},
	saveSearchedResult: (state, data) => {
		state.searchedResult = data;
	}
};
