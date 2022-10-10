import AdminInvite from '../../../src/views/auth/AdminInvite';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

let route = {
	$router: {
		push: jest.fn()
	},
	$route: {
		name: 'Login',
		query: {
			token: '12345'
		}
	}
};

let statusRes = {
	status: 200,
	statusText: 'OK'
};

let errRes = {
	status: 500,
	statusText: 'Failed',
	response: {
		data: {
			message: 'failed'
		}
	}
};

describe('AdminInvite', () => {
	let store;

	beforeEach(() => {
		store = new Vuex.Store({
			actions: {
				showAlert: jest.fn()
			},
			getters: {},
			mutations: {},
			modules: {
				admin_management: {
					actions: {
						processAdminInvite: jest.fn().mockResolvedValue(statusRes)
					},
					getters: {},
					mutations: {},
					namespaced: true
				}
			}
		});
		store.dispatch = jest.fn().mockResolvedValue(statusRes);
	});

	it('tests that the page mounts', () => {
		const wrapper = shallowMount(AdminInvite, {
			store,
			localVue,
			mocks: route
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('tests that the AdminInvite action is called', async () => {
		const wrapper = mount(AdminInvite, {
			store,
			localVue,
			mocks: route,
			data() {
				return {
					form: {
						first_name: 'Lani',
						last_name: 'Juyi',
						token: null,
						password: '1234abcd'
					}
				};
			}
		});
		let form = wrapper.find('form');
		form.trigger('submit');
		await wrapper.vm.$nextTick();

		expect(store.dispatch).toHaveBeenCalledWith('admin_management/processAdminInvite', {
			password: '1234abcd',
			first_name: 'Lani',
			last_name: 'Juyi',
			token: '12345'
		});

		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.name).toBe('Login');
	});

	it('tests that the error alert is triggered', async () => {
		store.dispatch = jest.fn().mockRejectedValue(errRes);

		const wrapper = mount(AdminInvite, {
			store,
			localVue,
			mocks: route,
			data() {
				return {
					form: {
						first_name: 'Lani',
						last_name: 'Juyi',
						token: null,
						password: '1234abcd'
					}
				};
			}
		});
		let form = wrapper.find('form');
		form.trigger('submit');
		await wrapper.vm.$nextTick();

		expect(store.dispatch).toHaveBeenCalledWith('admin_management/processAdminInvite', {
			password: '1234abcd',
			first_name: 'Lani',
			last_name: 'Juyi',
			token: '12345'
		});
	});
});
