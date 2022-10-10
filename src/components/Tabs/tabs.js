export default {
	data() {
		return {
			tabs: []
		};
	},
	created() {
		this.tabs = this.$children;
	},
	methods: {
		selectTab(stab) {
			this.tabs.forEach((tab) => {
				tab.isActive = tab.title == stab.title;
			});
		}
	}
};
