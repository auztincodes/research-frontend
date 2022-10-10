import '../../mixins/directives.js';
export default {
	name: 'ToggleDropdown',
	data() {
		return {
			showDropdown: false
		};
	},
	props: {
		isCheckboxItem: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		onClose() {
			this.showDropdown = false;
		}
	}
};
