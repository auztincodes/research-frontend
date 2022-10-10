import { ValidationProvider } from 'vee-validate';
import InputMixin from '../../../mixins/input';
import '../../../utils/validators';
export default {
	name: 'InputWrapper',
	components: {
		ValidationProvider
	},
	props: {
		colour: {
			type: String,
			default: '#f9f9f9'
		}
	},
	computed: {
		style() {
			return {
				colour: this.colour
			};
		}
	},
	created() {},
	mixins: [InputMixin]
};
