export default {
	name: 'Toggle',
	props: {
		itemKey: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		itemValue() {
			return this.itemKey;
		}
	}
};
