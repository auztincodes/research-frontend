const InputMixin = {
	props: {
		name: {
			type: String,
			default: ''
		},
		rules: {
			type: [Object, String],
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'text',
			validator(value) {
				return ['url', 'text', 'password', 'tel', 'search', 'number', 'email', 'date', 'file'].includes(value);
			}
		},
		value: {
			type: null,
			default: ''
		},

		icon: {
			type: Object,
			default: () => ({ type: '' })
		},
		labelVisible: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: ''
		},
		maxWidth: {
			type: String,
			default: ''
		},
		height: {
			type: String,
			default: ''
		},
		truthValue: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		border: {
			type: String,
			default: '1px solid #ebebf2;'
		},
		margin: {
			type: String,
			default: ''
		},
		labelColor: {
			type: String,
			default: ''
		},
		backgroundColor: {
			type: String,
			default: ''
		},
		borderRadius: {
			type: String,
			default: ''
		},
		searchIconColor: {
			type: String,
			default: '#989AAA'
		}
	},
	data: () => ({
		innerValue: ''
	}),
	computed: {
		hasValue() {
			return !!this.innerValue;
		},
		style() {
			return {
				width: this.width,
				height: this.height,
				maxWidth: this.maxWidth,
				border: this.border,
				margin: this.margin,
				borderRadius: this.borderRadius,
				backgroundColor: this.backgroundColor
			};
		}
	},
	watch: {
		innerValue(value) {
			this.$emit('input', value);
		},
		value(val) {
			if (val !== this.innerValue) {
				this.innerValue = val;
			}
		}
	},
	created() {
		if (this.value) {
			this.innerValue = this.value;
		}
	}
};
export default InputMixin;
