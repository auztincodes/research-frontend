import { ValidationObserver } from 'vee-validate';
import { mapActions } from 'vuex';
import TextInput from '@/components/Input/TextInput';
import CButton from '@/components/Button';
import Loader from '@/components/Loader';
import Logo from '@/components/Logo';
export default {
	name: 'Login',
	data() {
		return {
			email: null,
			loading: false
		};
	},
	created() {},
	computed: {},
	methods: {
		...mapActions({
			forgotPassword: 'auth/forgotPassword',
			showAlert: 'showAlert'
		}),
		async submit() {
			this.loading = true;
			try {
				const response = await this.forgotPassword({ email: this.email });
				if (response.status === 200) {
					this.showAlert({
						status: 'success',
						message: response.data.message,
						showAlert: true
					});
					this.$router.push({ name: 'CheckInbox' });
					return true;
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: 'Email not found',
					showAlert: true
				});
			} finally {
				this.loading = false;
			}
		}
	},
	components: {
		ValidationObserver,
		TextInput,
		CButton,
		Loader,
		Logo
	}
};
