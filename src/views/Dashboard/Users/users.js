import { ValidationObserver } from 'vee-validate';
import TextInput from '@/components/Input';
import VTable from '@/components/Table';
import VHeader from '@/components/Header/search/Header';
import VButton from '@/components/Button';
import ToggleDropdown from '@/components/ToggleDropdown';
import Modal from '@/components/Modal';
import Loader from '@/components/Loader';
import PasswordInput from '@/components/Input/PasswordInput';
import RadioBtn from '@/components/RadioButton';
import Status from '@/components/Status';
import StatusTag from '@/components/StatusTag';
import { mapActions } from 'vuex';
import debounce from 'lodash.debounce';

export default {
	name: 'Users',
	data() {
		return {
			form: {
				first_name: '',
				last_name: '',
				email: '',
				organisation: '',
				monthly_research: '',
				profession: '',
				password: '',
				role: ''
			},
			loading: false,
			createUser: false,
			filter: false,
			showEditModal: false,
			deactivateModal: false,
			activateModal: false,
			suspendModal: false,
			toggleClass: true,
			statusOption: '',
			userInfo: null,
			statusType: [
				{
					value: 'active',
					title: 'Active'
				},
				{
					value: 'inactive',
					title: 'Inactive'
				},
				{
					value: 'suspended',
					title: 'Suspended'
				}
			],
			tableHeaders: [
				{
					name: 'Name',
					sortHeader: 'full_name'
				},
				{
					name: 'Email Address',
					sortHeader: 'company'
				},
				{
					name: 'Researched Contact',
					sortHeader: 'research_score'
				},
				{
					name: 'Status',
					sortHeader: ''
				},
				{
					name: 'Research Date'
				},
				{
					name: ' '
				}
			],
			currentPage: 0,
			total: 0,
			limit: 50,
			page: 1,
			count: 0,
			nextPage: null,
			usersLoading: false,
			users: null,
			stat: {
				statusCode: 'ACTIVE',
				message: 'Active'
			},
			userId: null,
			userDetails: [],
			contactToModify: {},
			searchQuery: '',
			filterData: ''
		};
	},
	props: {
		modalName: String
	},
	components: {
		ValidationObserver,
		TextInput,
		VTable,
		VHeader,
		ToggleDropdown,
		Modal,
		Loader,
		PasswordInput,
		RadioBtn,
		Status,
		StatusTag,
		VButton
	},
	async mounted() {
		await this.getAllUsers();
	},
	methods: {
		...mapActions({
			allUsers: 'users_management/allUsers',
			deactivateUser: 'users_management/deactivateUser',
			activateUser: 'users_management/activateUser',
			suspendUser: 'users_management/suspendUser',
			getSingleUser: 'users_management/singleUser',
			updateUser: 'users_management/updateUser',
			createNewUser: 'users_management/createUser',
			search: 'users_management/search',
			showAlert: 'showAlert'
		}),

		async getAllUsers() {
			this.usersLoading = true;
			try {
				const users = await this.allUsers({ page: this.page, limit: this.limit });
				const { status, data, statusText } = users;
				if (status === 200 && statusText === 'OK') {
					this.users = data.response.data;
					this.count = data.response.count;
					this.currentPage = data.response.currentPage;
					this.total = Math.ceil(data.response.count / this.limit);
					this.nextPage = data.response.nextPage;
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.usersLoading = false;
			}
		},
		clickCallback(page) {
			this.page = page;
			this.getAllUsers();
		},
		clearFilter() {
			this.filterData = '';
			this.statusOption = '';
			this.toggleModalClass('filter');
			this.getAllUsers();
		},
		async registerUser() {
			this.loading = true;
			try {
				const response = await this.createNewUser(this.form);
				const { status, statusText } = response;
				if (status === 200 && statusText === 'OK') {
					await this.getAllUsers();
					this.toggleModalClass('createUser');
					this.form = {};
					this.showAlert({
						status: 'success',
						message: 'User created successfully',
						showAlert: true
					});
				}
			} catch (error) {
				this.showAlert({
					status: 'error',
					message: 'Whoops! User not created',
					showAlert: true
				});
			} finally {
				this.loading = false;
			}
		},
		toggleModalClass(modal) {
			if (!this[modal]) {
				this[modal] = true;
			} else {
				this.toggleClass = !this.toggleClass;
				setTimeout(() => {
					this[modal] = !this[modal];
					this.toggleClass = !this.toggleClass;
				}, 500);
			}
		},
		showUser(item) {
			this.$router.push({ name: 'User', query: { userId: item._id } });
		},
		openEditModal(item) {
			this.userInfo = item;
			this.toggleModalClass('showEditModal');
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
					this.toggleModalClass('showEditModal');
					this.getAllUsers();
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
		},

		openDeactivateModal(item) {
			const { _id, last_name, first_name } = item;
			this.contactToModify = { ...this.contactToModify, _id, last_name, first_name };
			this.deactivateModal = true;
		},
		async deactivate() {
			this.loading = true;
			try {
				const changeStatus = await this.deactivateUser(this.contactToModify._id);
				const { status, statusText } = changeStatus;
				if (status === 200 && statusText === 'OK') {
					this.toggleModalClass('deactivateModal');

					await this.getAllUsers();
					this.contactToModify = {};
					this.showAlert({
						status: 'success',
						message: changeStatus.data.message,
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
		},
		openActivateModal(item) {
			const { _id, last_name, first_name } = item;
			this.contactToModify = { ...this.contactToModify, _id, last_name, first_name };
			this.activateModal = true;
		},
		async activate() {
			this.loading = true;
			try {
				const changeStatus = await this.activateUser(this.contactToModify._id);
				const { status, statusText } = changeStatus;
				if (status === 200 && statusText === 'OK') {
					this.toggleModalClass('activateModal');
					await this.getAllUsers();
					this.contactToModify = {};
					this.showAlert({
						status: 'success',
						message: changeStatus.data.message,
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
		},
		openSuspendModal(item) {
			const { _id, last_name, first_name } = item;
			this.contactToModify = { ...this.contactToModify, _id, last_name, first_name };
			this.suspendModal = true;
		},
		async suspend() {
			this.loading = true;
			try {
				const changeStatus = await this.suspendUser(this.contactToModify._id);
				const { status, statusText } = changeStatus;
				if (status === 200 && statusText === 'OK') {
					this.toggleModalClass('suspendModal');
					await this.getAllUsers();
					this.contactToModify = {};
					this.showAlert({
						status: 'success',
						message: changeStatus.data.message,
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
		},

		async searchPage(payload) {
			this.loading = true;
			try {
				const response = await this.search(payload);
				if (response.data.response.data.length) {
					this.users = response.data.response.data;
					if (this.filter) {
						this.toggleModalClass('filter');
					}
				} else {
					this.showAlert({
						status: 'error',
						message: 'No user found',
						showAlert: true
					});
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
			}
		},
		clearSearch() {
			this.searchQuery = '';
		}
	},
	watch: {
		searchQuery: debounce(function (newVal) {
			if (newVal) {
				this.searchPage({ q: newVal });
			} else {
				this.getAllUsers();
			}
		}, 600)
	}
};
