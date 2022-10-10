import { ValidationProvider } from 'vee-validate';
import '../../utils/validators';
import InputMixin from '../../mixins/input';
export default {
	name: 'DCheckbox',
	mixins: [InputMixin],
	components: {
		ValidationProvider
	},
	props: {
		name: {
			type: String,
			default: '',
			required: true
		},
		isRequired: {
			type: Boolean,
			default: false
		},
		truthValue: {
			type: String,
			default: ''
		},
		inputType: {
			type: String,
			default: 'checkbox'
		}
	}
};
