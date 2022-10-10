import InputWrapper from '../InputWrapper';
import InputMixin from '../../../mixins/input';
export default {
	name: 'password-input',
	components: {
		InputWrapper
	},
	mixins: [InputMixin],
	data() {
		return {
			show_password: false
		};
	}
};
