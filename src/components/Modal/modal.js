export default {
	name: 'modal',
	props: {
		toggleClass: {
			type: Boolean,
			default: true
		},
		position: {
			type: String,
			default: 'right'
		},
		useSlot: {
			type: Boolean,
			default: true
		},
		showInfo: {
			type: Boolean,
			default: false
		},
		maxWidth: {
			type: String,
			default: '496px'
		},
		borderRadius: {
			type: String,
			default: ''
		},
		marginTop: {
			type: String,
			default: ''
		},
		active: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		style() {
			return {
				maxWidth: this.maxWidth,
				borderRadius: this.borderRadius,
				marginTop: this.marginTop
			};
		}
	},
	methods: {
		closeModal() {
			this.$emit('close');
		},
		submit() {
			this.$emit('submit');
		}
	}
};
