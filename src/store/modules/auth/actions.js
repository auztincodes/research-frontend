import api from '../../../services/api/index';

export default {
	/**
	 * Handles user registration
	 * @param {Object} data - user registration payload
	 */
	login: async ({ commit }, data) => {
		const url = 'user/login';
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.post(url, data);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	forgotPassword: async ({ commit }, data) => {
		const url = 'user/password/forget';
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.post(url, data);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	},
	resetPassword: async ({ commit }, data) => {
		const url = 'user/password/reset';
		commit('resetReq', null, { root: true });
		commit('reqInit', null, { root: true });
		try {
			const response = await api.post(url, data);
			return Promise.resolve(response);
		} catch (error) {
			return Promise.reject(error);
		}
	}
};
