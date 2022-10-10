export default {
	props: {
		size: {
			type: String,
			default: 'default',
			validator: function (value) {
				return ['small', 'icon', 'medium', 'full', 'large', 'modal', 'default'].indexOf(value) !== -1;
			}
		},
		buttonType: {
			type: String,
			default: 'muted',
			validator: function (value) {
				return ['primary', 'outline', 'secondary', 'link', 'muted', 'warning'].indexOf(value) !== -1;
			}
		},
		submitType: {
			type: String,
			default: 'button'
		}
	},
	computed: {
		classes() {
			return {
				btn: true,
				[`btn-${this.buttonType}`]: true,
				[`btn-${this.size}`]: true
			};
		}
	}
};
