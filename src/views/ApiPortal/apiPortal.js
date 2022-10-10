import VHeader from '@/components/Header/search/Header';
import { mapActions } from 'vuex';
import VButton from '@/components/Button';
import Loader from '@/components/Loader';

export default {
	name: 'ApiPortal',
	data() {
		return {
			keys: [],
			loading: false,
			pageLoading: true
		};
	},
	components: {
		VButton,
		VHeader,
		Loader
	},
	async mounted() {
		try {
			const response = await this.fetchApiKeys();
			const { status, statusText, data } = response;

			if (status === 200 && statusText === 'OK' && data.keys.length) {
				this.keys = data.keys[0];
				this.showAlert({
					status: 'success',
					message: 'API Keys retrieved successfully',
					showAlert: true
				});
			} else {
				this.showAlert({
					status: 'info',
					message: 'No API Keys available. Kindly generate one',
					showAlert: true
				});
			}
		} catch (error) {
			this.showAlert({
				status: 'error',
				message: 'Unable to retrieve API keys',
				showAlert: true
			});
		} finally {
			this.pageLoading = false;
		}
	},
	methods: {
		...mapActions({
			fetchApiKeys: 'user/fetchApiKeys',
			generateApiKey: 'user/generateApiKey',
			regenerateApiKey: 'user/regenerateApiKey',
			showAlert: 'showAlert'
		}),

		async getKey() {
			this.loading = true;

			if (!this.keys.length) {
				this.generateKeys();
			} else {
				this.regenerateKeys();
			}
		},
		async generateKeys() {
			try {
				const response = await this.generateApiKey();
				const { status, statusText, data } = response;
				if (status === 200 && statusText === 'OK') {
					this.keys = data.keys;
					this.showAlert({
						status: 'success',
						message: 'API Keys generated successfully',
						showAlert: true
					});
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: 'Unable to generate API keys',
					showAlert: true
				});
			}
			this.loading = false;
		},
		async regenerateKeys() {
			const array = this.keys;
			const id = array[0].keyId;
			try {
				const response = await this.regenerateApiKey({ id });
				const { status, statusText, data } = response;
				if (status === 200 && statusText === 'OK') {
					this.keys = data.keys;

					this.showAlert({
						status: 'success',
						message: 'API Keys regenerated successfully',
						showAlert: true
					});
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: 'Unable to regenerate API keys',
					showAlert: true
				});
			}
		},

		async copyKey(selectedKey, index) {
			if (selectedKey) {
				await navigator.clipboard
					.writeText(selectedKey)
					.then(() => {
						const copyBtn = this.$refs[`copyBtn-${index}`];

						if (copyBtn.innerText !== 'Copied!') {
							const originalText = copyBtn[0].innerText;
							copyBtn[0].innerText = 'Copied!';
							setTimeout(() => {
								copyBtn[0].innerText = originalText;
							}, 1500);
						}
						this.showAlert({
							status: 'success',
							message: 'API Key copied',
							showAlert: true
						});
					})
					.catch((error) => {
						console.log(error);
						this.showAlert({
							status: 'error',
							message: 'Unable to copy API key',
							showAlert: true
						});
					});
			}
		}
	}
};
