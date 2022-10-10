export default {
	props: {
		article: {
			type: Object,
			default: {}
		},
		published: {
			type: String,
			default: null
		}
	},
	computed: {
		cleanUrl() {
			const url = this.article.url;
			return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
		}
	}
};
