import VCheckbox from '@/components/Checkbox';
import VButton from '@/components/Button';
import VModal from '@/components/Modal';
import VTextInput from '@/components/Input';
import { ValidationObserver } from 'vee-validate';
import { mapMutations, mapActions } from 'vuex';
import Loader from '@/components/Loader';
export default {
	name: 'SearchSettings',
	components: {
		VCheckbox,
		VTextInput,
		VButton,
		VModal,
		ValidationObserver,
		Loader
	},
	props: {
		headers: {
			type: Array,
			default: []
		},
		dataFields: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			loading: false,
			showMoreSearchSettings: false,
			initialKeywords: [],
			initialCompanyKeywords: [],
			toggleClass: true,
			showModal: false,
			settings: {
				company_research: [],
				contact_research: []
			}
		};
	},

	methods: {
		...mapMutations({
			saveSearchPayload: 'search_services/saveSearchPayload',
			saveSearchedResult: 'search_services/saveSearchedResult'
		}),
		...mapActions({
			research: 'search_services/research',
			userSettings: 'user/settings',
			showAlert: 'showAlert',
			getSettings: 'user/getSettings'
		}),
		onKeywordsChange(searchType, event) {
			this.settings[searchType] = event.target.value.split(',');
		},

		toggleModal() {
			if (!this.showModal) {
				this.showModal = true;
			} else {
				this.toggleClass = !this.toggleClass;
				setTimeout(() => {
					this.showModal = !this.showModal;
					this.toggleClass = !this.toggleClass;
				}, 500);
			}
		},
		checkSettingChanges() {
			if (
				JSON.stringify(this.initialKeywords) === JSON.stringify(this.settings.contact_research) &&
				JSON.stringify(this.initialCompanyKeywords) === JSON.stringify(this.settings.company_research)
			) {
				this.closeMoreSearchSettings();
			} else {
				this.toggleModal();
			}
		},
		closeMoreSearchSettings() {
			this.$emit('routerEvent', 'closeMoreSearchSettings');
		},
		async submitForm() {
			console.log(this.dataFields);

			// this.loading = true;
			// try {
			// 	const response = await this.userSettings(this.settings);
			// 	if (response.status === 200 && response.statusText === 'OK') {
			// 		this.showAlert({
			// 			status: 'success',
			// 			message: response.data.message,
			// 			showAlert: true
			// 		});
			// 		this.closeMoreSearchSettings();
			// 		return true;
			// 	}
			// } catch (error) {
			// 	this.showAlert({
			// 		status: 'error',
			// 		message: 'An error occurred',
			// 		showAlert: true
			// 	});
			// } finally {
			// 	this.loading = false;
			// }
		},
		async getUserSettings() {
			this.loading = false;
			try {
				const { status, statusText, data } = await this.getSettings();
				if (status === 200 && statusText === 'OK') {
					const {
						data: { contact_research, company_research }
					} = data;
					if (contact_research) {
						this.settings.contact_research = contact_research;
						this.initialKeywords = this.settings.contact_research;
					}
					if (company_research) {
						this.settings.company_research = company_research;
						this.initialCompanyKeywords = this.settings.company_research;
					}
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: 'An error occurred',
					showAlert: true
				});
			} finally {
				this.loading = false;
			}
		}
	},
	async created() {
		this.showMoreSearchSettings = false;
		await this.getUserSettings();
	}
};
