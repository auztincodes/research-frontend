import instance from '../axios-instance';

export default {
	get(url) {
		return instance.get(url);
	},
	post(url, data) {
		return instance.post(url, data);
	},
	put(url, data) {
		return instance.put(url, data);
	},
	patch(url, data) {
		return instance.patch(url, data);
	},
	delete(url, data) {
		return instance.delete(url, { data });
	}
};
