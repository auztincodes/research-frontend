import { ValidationObserver } from 'vee-validate';
import { mapActions } from 'vuex';
import CButton from '@/components/Button';
import VTabs from '@/components/Tabs';
import VTab from '@/components/Tabs/Tab';
import VTextInput from '@/components/Input';
import TextInput from '@/components/Input';
import VTable from '@/components/Table';
import VHeader from '@/components/Header/search/Header';
import Toggle from '@/components/Toggle';
import Status from '@/components/Status';
import ToggleDropdown from '@/components/ToggleDropdown';
import Modal from '@/components/Modal';
import Loader from '@/components/Loader';
import FileUpload from 'vue-upload-component';
import researchMixin from '@/mixins/research';
import csvMixins from '@/mixins/csvMixins';
import ConfigData from '../../ConfigImportData/ConfigImportData.vue';
import RadioBtn from '@/components/RadioButton';

export default {
	name: 'User',
	mixins: [researchMixin, csvMixins],
	data() {
		return {
			form: {
				first_name: '',
				last_name: '',
				email: '',
				organisation: '',
				monthly_research: '',
				researches_performed: '',
				profession: '',
				password: '',
				role: ''
			},
			showEditModal: false,
			contactModal: false,
			checkedContacts: [],
			loading: false,
			toggleClass: true,
			tableHeaders: [
				{
					name: '',
					elementSlot: true
				},
				{
					name: 'Name',
					sortHeader: 'full_name'
				},
				{
					name: 'Company',
					sortHeader: 'company'
				},
				{
					name: 'Title',
					sortHeader: ''
				},
				{
					name: 'Linkedin',
					sortHeader: ''
				},
				{
					name: 'Score'
				},
				{
					name: 'Last update'
				},
				{
					name: 'Status',
					sortHeader: ''
				},
				{
					name: ' '
				}
			],
			history: [],
			activeTab: 'details',
			accept: 'csv',
			extensions: 'csv',
			files: [],
			userId: null,
			userInfo: null,
			userDetails: [],
			usersLoading: false,
			pageLoading: false,
			nextPage: null,
			currentPage: 0,
			total: 0,
			limit: 50,
			page: 1,
			count: 0,
			settings: {
				company_research: [],
				contact_research: []
			},
			statusType: [
				{
					value: 'active',
					title: 'Activate'
				},
				{
					value: 'suspended',
					title: 'Suspend'
				},
				{
					value: 'inactive',
					title: 'Deactivate'
				}
			],
			statusOption: [],
			previousStatus: '',
			statusIndex: '',
			showApiModal: false,
			ApiModalContent: {},
			keys: [],
			showApiKey: false
		};
	},
	components: {
		ValidationObserver,
		CButton,
		VTabs,
		VTab,
		VTextInput,
		TextInput,
		VTable,
		VHeader,
		Toggle,
		Loader,
		Status,
		ToggleDropdown,
		Modal,
		FileUpload,
		ConfigData,
		RadioBtn
	},
	methods: {
		...mapActions({
			showAlert: 'showAlert',
			getSingleUser: 'users_management/singleUser',
			research_history: 'users_management/research_history',
			bulk_research: 'users_management/bulk_research',
			subscribeResearch: 'search_services/subscribeResearch',
			getSettings: 'users_management/getSettings',
			userSettings: 'users_management/settings',
			deactivateUser: 'users_management/deactivateUser',
			activateUser: 'users_management/activateUser',
			updateUser: 'users_management/updateUser',
			fetchApiKeys: 'users_management/fetchApiKeys',
			activateKey: 'users_management/activateKey',
			deactivateKey: 'users_management/deactivateKey',
			suspendKey: 'users_management/suspendKey'
		}),
		async getApiKeys() {
			this.pageLoading = true;
			this.statusOption = [];
			try {
				const response = await this.fetchApiKeys(this.$route.query.userId);
				const { status, statusText, data } = response;

				if (status === 200 && statusText === 'OK' && data.keys.length) {
					this.keys = data.keys;
					this.keys.forEach((key) => {
						this.statusOption.push(key[0].status);
					});
					this.showAlert({
						status: 'success',
						message: 'Api Keys retrieved successfully',
						showAlert: true
					});
				} else {
					this.showAlert({
						status: 'info',
						message: 'No Api Keys available. Kindly generate one',
						showAlert: true
					});
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: 'Unable to retrieve Api keys',
					showAlert: true
				});
			} finally {
				this.pageLoading = false;
			}
		},
		changeStatus(event, index, lastStatus) {
			this.previousStatus = lastStatus;
			this.statusOption[index] = event.target.value;
			this.statusIndex = index;
			this.toggleApiModal();
			switch (this.statusOption[index]) {
				case 'active':
					this.ApiModalContent = {
						title: 'Activate API Key',
						description: 'You are about to activate an API key, click activate to continue with this action.'
					};
					break;
				case 'suspended':
					this.ApiModalContent = {
						title: 'Suspend API Key',
						description: 'You are about to suspend an API key, click suspend to continue with this action.'
					};

					break;
				case 'inactive':
					this.ApiModalContent = {
						title: 'Deactivate API Key',
						description: 'You are about to deactivate an API key, click deactivate to continue with this action.'
					};

					break;
				default:
					this.ApiModalContent = null;
			}
		},
		async deactivateApiKey() {
			const id = this.previousStatus.keyId;
			const userId = this.$route.query.userId;
			this.loading = true;
			try {
				const response = await this.deactivateKey({ userId, id });
				const { status, statusText } = response;
				if (status === 200 && statusText === 'OK') {
					this.showAlert({
						status: 'success',
						message: 'Api Keys deactivated successfully',
						showAlert: true
					});
					this.toggleApiModal();
					this.getApiKeys();
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
		},
		async activateApiKey() {
			const id = this.previousStatus.keyId;
			const userId = this.$route.query.userId;
			this.loading = true;
			try {
				const response = await this.activateKey({ userId, id });
				const { status, statusText } = response;
				if (status === 200 && statusText === 'OK') {
					this.showAlert({
						status: 'success',
						message: 'Api Keys activated successfully',
						showAlert: true
					});
					this.toggleApiModal();
					this.getApiKeys();
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
		},
		async suspendApiKey() {
			const id = this.previousStatus.keyId;
			const userId = this.$route.query.userId;
			this.loading = true;
			try {
				const response = await this.suspendKey({ userId, id });
				const { status, statusText } = response;
				if (status === 200 && statusText === 'OK') {
					this.showAlert({
						status: 'success',
						message: 'Api Keys suspended successfully',
						showAlert: true
					});
					this.toggleApiModal();
					this.getApiKeys();
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
		},
		cancelApiModal() {
			this.toggleApiModal();
			setTimeout(() => {
				this.statusOption[this.statusIndex] = this.previousStatus.status;
			}, 0);
		},
		toggleApiModal() {
			if (!this.showApiModal) {
				this.showApiModal = true;
			} else {
				this.toggleClass = !this.toggleClass;
				setTimeout(() => {
					this.showApiModal = !this.showApiModal;
					this.toggleClass = !this.toggleClass;
					this.ApiModalContent = {};
				}, 500);
			}
		},
		onKeywordsChange(searchType, event) {
			this.settings[searchType] = event.target.value.split(',');
		},
		statusToggle() {
			this.userDetails.status === 'active' ? this.deactivate() : this.activate();
		},
		async activate() {
			try {
				const changeStatus = await this.activateUser(this.userId);
				const { status, statusText } = changeStatus;
				if (status === 200 && statusText === 'OK') {
					this.showAlert({
						status: 'success',
						message: changeStatus.data.message,
						showAlert: true
					});
					this.fetchUser();
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: error.response.data.message,
					showAlert: true
				});
			}
		},
		async deactivate() {
			try {
				const changeStatus = await this.deactivateUser(this.userId);
				const { status, statusText } = changeStatus;
				if (status === 200 && statusText === 'OK') {
					this.showAlert({
						status: 'success',
						message: changeStatus.data.message,
						showAlert: true
					});
					this.fetchUser();
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: error.response.data.message,
					showAlert: true
				});
			}
		},
		async getUserSettings() {
			this.loading = false;
			try {
				const { status, statusText, data } = await this.getSettings(this.userId);
				if (status === 200 && statusText === 'OK') {
					const {
						data: { contact_research, company_research }
					} = data;
					if (contact_research) {
						this.settings.contact_research = contact_research;
					}
					if (company_research) {
						this.settings.company_research = company_research;
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
		},
		toggleEditModal() {
			if (!this.showEditModal) {
				this.showEditModal = true;
			} else {
				this.toggleClass = !this.toggleClass;
				setTimeout(() => {
					this.showEditModal = !this.showEditModal;
					this.toggleClass = !this.toggleClass;
				}, 500);
			}
		},
		async submitForm() {
			this.loading = true;
			try {
				const response = await this.userSettings({ userId: this.userId, data: this.settings });
				if (response.status === 200 && response.statusText === 'OK') {
					this.showAlert({
						status: 'success',
						message: response.data.message,
						showAlert: true
					});
					return true;
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
		},
		toggleUploadContact() {
			if (!this.contactModal) {
				this.contactModal = true;
			} else {
				this.toggleClass = !this.toggleClass;
				setTimeout(() => {
					this.contactModal = !this.contactModal;
					this.toggleClass = !this.toggleClass;
				}, 500);
			}
		},
		setActiveTab(evt) {
			switch (evt) {
				case 'details':
					this.activeTab = evt;
					break;
				case 'contacts':
					this.activeTab = evt;
					this.getHistory();
					break;
				case 'api-keys':
					this.activeTab = evt;
					this.getApiKeys();
					break;
				case 'settings':
					this.activeTab = evt;
					this.getUserSettings();
					break;
			}
		},
		checkAll(event) {
			if (event.target.checked) {
				this.history.forEach((item) => {
					if (item.status.statusCode === 'DONE' || item.status.statusCode === '') {
						this.checkedContacts.push(item.rowId);
						return item.rowId;
					}
					return item.rowId;
				});
			} else {
				this.checkedContacts = [];
			}
		},
		backToUsers() {
			this.$router.push({ name: 'Users' });
		},
		async uploadBulkResearch() {
			this.loading = true;
			try {
				await this.bulk_research({ id: this.userId, contacts: this.csvImport });
				this.page = 1;
				this.openConfigPage = false;
				this.pageLoading = true;
				this.toggleUploadContact();
				await this.getHistory();
				return true;
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: error.response.data.message,
					showAlert: true
				});
			} finally {
				this.loading = false;
			}
		},
		async getHistory() {
			this.pageLoading = true;
			try {
				const response = await this.research_history({ id: this.userId, page: this.page, limit: this.limit });
				const { status, data, statusText } = response;
				if (status === 200 && statusText === 'OK') {
					this.history = data.data.data;
					this.count = data.data.count;
					this.currentPage = data.data.currentPage;
					this.total = Math.ceil(data.data.count / this.limit);
					this.nextPage = data.data.nextPage;
					this.checkPendngStatus();
					return true;
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: error.response.data.message,
					showAlert: true
				});
			} finally {
				this.pageLoading = false;
			}
		},
		clickCallback(page) {
			this.page = page;
			this.getHistory();
		},
		showResearch(item) {
			if (item.status.statusCode === 'READY' || item.status.statusCode === 'DONE') {
				this.$router.push({ name: 'Insights', query: { rowId: item.rowId } });
			}
		},
		async checkPendngStatus() {
			let pendingStatus = await this.history.filter((data) => {
				return data.status.statusCode !== 'IN_PROGRESS';
			});
			if (pendingStatus.length > 0) {
				this.subscribe();
			}
		},
		async subscribe() {
			try {
				const response = await this.subscribeResearch();
				if (response.status === 200) {
					await this.history.map((data) => {
						if (data.rowId === response.data.done.rowId) {
							data.status = response.data.done.status;
							data.research_score = response.data.done.research_score;
						}
						return data;
					});
					this.checkPendngStatus();
				}
				if (response.status >= 500) {
					this.getHistory();
				}
				return true;
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: error.response.data.message,
					showAlert: true
				});
			}
		},
		async fetchUser() {
			this.loading = true;
			try {
				const response = await this.getSingleUser(this.userId);
				if (response.status === 200 && response.statusText === 'OK') {
					this.userDetails = response.data.data;
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
			}
		},
		openEditModal(item) {
			this.userInfo = item;
			this.toggleEditModal();
		},
		async editUser() {
			this.loading = true;
			const { first_name, last_name, role, monthly_research, organisation, profession } = this.userInfo;
			try {
				const response = await this.updateUser({
					id: this.userInfo._id,
					user: { first_name, last_name, role, monthly_research, organisation, profession }
				});
				const { status, statusText } = response;
				if (status === 200 && statusText === 'OK') {
					this.toggleEditModal();
					this.loading = true;
					await this.fetchUser();
					this.showAlert({
						status: 'success',
						message: 'user successfully updated',
						showAlert: true
					});
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
	mounted() {
		this.userId = this.$route.query.userId;
		this.fetchUser();
	}
};
