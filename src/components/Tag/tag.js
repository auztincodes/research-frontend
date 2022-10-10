export default {
	name: 'c-tag',
	props: {
		text: {
			type: String
		}
	},
	computed: {
		hasValue() {
			return !!this.innerValue;
		}
	},
	methods: {
		deleteTag() {
			this.$emit('click');
		}
	}
};
