import api from '../../../services/api/index';
export default {
	/**
	 * @param {Object} data - service payload
	 */

	research: async ({ commit }, data) => {
		// const url = 'research';
		const url = 'research/single';
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.post(url, data);
			return Promise.resolve(response);
		} catch (error) {
			console.log('err', error);
			return Promise.reject(error);
		}
	},
	content: async ({ commit }, data) => {
		const url = 'content';
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.post(url, data);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	bulk_research: async ({ commit }, data) => {
		const url = 'research/bulk-research';
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.post(url, data);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	research_history: async ({ commit }, { page, limit }) => {
		const url = `research/history?page=${page}&limit=${limit}`;
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.get(url);
			return Promise.resolve(response);
		} catch (error) {
			console.log('err', error);
			return Promise.reject(error);
		}
	},
	researchedResult: async ({ commit }, id) => {
		const url = `research/single/${id}`;
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.get(url);
			return Promise.resolve(response);
		} catch (error) {
			console.log('err', error);
			return Promise.reject(error);
		}
	},
	subscribeResearch: async ({ commit }) => {
		const url = 'research/subscribe';
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.get(url);
			return Promise.resolve(response);
		} catch (error) {
			console.log('err', error);
			return Promise.reject(error);
		}
	},
	export_history: async ({ commit }, data) => {
		const url = 'research/export';
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.post(url, data);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	researchDone: async ({ commit }, data) => {
		const url = `research/done/${data}`;
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.put(url);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	deleteSingleResearch: async ({ commit }, id) => {
		const url = `research/single/${id}`;
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.delete(url);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	refresh: async ({ commit }, id) => {
		const url = `research/refresh/${id}`;
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.post(url);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	dislike: async ({ commit }, data) => {
		const url = `research/dislike/${data.rowId}`;
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.post(url, { url: data.url, comment: data.comment });
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
