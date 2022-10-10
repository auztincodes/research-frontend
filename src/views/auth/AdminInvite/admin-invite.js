import { ValidationObserver } from 'vee-validate';
import { mapActions } from 'vuex';
import TextInput from '@/components/Input/TextInput';
import CButton from '@/components/Button';
import PasswordInput from '@/components/Input/PasswordInput';
import Loader from '@/components/Loader';
import Logo from '@/components/Logo';
export default {
	name: 'Login',
	data() {
		return {
			form: {
				first_name: null,
				last_name: null,
				token: null,
				password: null
			},
			loading: false
		};
	},
	created() {
		const token = this.$route.query.token;
		if (token) {
			this.form.token = token;
		}
	},
	methods: {
		...mapActions({
			AdminInvite: 'admin_management/processAdminInvite',
			showAlert: 'showAlert'
		}),
		async submit() {
			this.loading = true;
			try {
				const response = await this.AdminInvite(this.form);
				if (response.status === 200) {
					this.showAlert({
						status: 'success',
						message: 'Admin invited Successfully',
						showAlert: true
					});
					this.$router.push({ name: 'Login' });
					return true;
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: error.response.data.message,
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
		PasswordInput,
		Loader,
		Logo
	}
};
