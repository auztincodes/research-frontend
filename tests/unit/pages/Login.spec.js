import Login from '../../../src/views/auth/Login';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CButton from '../../../src/components/Button';

const localVue = createLocalVue();

localVue.use(Vuex);

let statusRes = {
	status: 200,
	statusText: 'OK',
	data: {
		data: {
			email: 'abass@enyata.com',
			first_name: 'Abass',
			id: '607ea1bf965bbe6414c00b13',
			is_settings: true,
			last_name: 'Adamo',
			role: 'superadmin',
			token: '1'
		},
		message: 'User login successful',
		status: 'success'
	}
};

let historyRes = {
	status: 200,
	statusText: 'OK',
	data: {
		data: {
			email: 'abass@enyata.com',
			first_name: 'Abass',
			id: '607ea1bf965bbe6414c00b13',
			is_settings: true,
			last_name: 'Adamo',
			role: 'user',
			token: '1'
		},
		message: 'User login successful',
		status: 'success'
	}
};

let response = {
	data: {
		data: {
			history: [{ full_name: 'John karony' }]
		}
	}
};

let failedRes = {
	data: {
		data: {
			history: []
		}
	}
};
let route = {
	$router: {
		push: jest.fn()
	},
	$route: {
		routes: [
			{ path: '/contact-research', name: 'ContactResearch' },
			{ path: '/', name: 'Search' },
			{ path: '/dashboard/users', name: 'Users' }
		]
	}
};

describe('Login', () => {
	let store;

	beforeEach(() => {
		store = new Vuex.Store({
			actions: {
				showAlert: jest.fn()
			},
			getters: {},
			mutations: {},
			modules: {
				auth: {
					actions: {
						login: jest.fn().mockResolvedValue(statusRes)
					},
					getters: {},
					mutations: {
						loginSuccess: jest.fn()
					},
					namespaced: true
				},
				search_services: {
					namespaced: true,
					actions: {
						research_history: jest.fn().mockResolvedValue(response)
					}
				}
			}
		});
		store.dispatch = jest.fn().mockResolvedValue(statusRes);
	});

	it('tests that the page mounts', () => {
		const wrapper = shallowMount(Login, {
			store,
			localVue
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('tests that the login action is called', async () => {
		const wrapper = mount(Login, {
			store,
			localVue,
			mocks: route,
			data() {
				return {
					form: {
						password: '1234abcd',
						email: 'lani@enyata.com'
					}
				};
			}
		});
		let form = wrapper.find('form');
		form.trigger('submit');
		await wrapper.vm.$nextTick();

		expect(store.dispatch).toHaveBeenCalledWith('auth/login', {
			password: '1234abcd',
			email: 'lani@enyata.com'
		});

		wrapper.vm.$nextTick();
	});

	it('tests that the error alert is triggered', async () => {
		store.dispatch = jest.fn().mockResolvedValue(historyRes);

		const wrapper = mount(Login, {
			store,
			localVue,
			mocks: route,
			data() {
				return {
					page: 1,
					limit: 1
				};
			}
		});
		let btn = wrapper.findComponent(CButton);
		btn.trigger('click');
	});

	it('tests that the getHistory method is called', async () => {
		store.dispatch = jest.fn().mockResolvedValue(response);

		const wrapper = shallowMount(Login, {
			store,
			localVue,
			mocks: route
		});
		expect(wrapper.vm.getHistory());
		expect(store.dispatch).toHaveBeenCalledWith('search_services/research_history', {
			page: 1,
			limit: 1
		});
	});

	it('tests that the getHistory method routes to search page', async () => {
		store.dispatch = jest.fn().mockResolvedValue(failedRes);

		const wrapper = shallowMount(Login, {
			store,
			localVue
		});
		expect(wrapper.vm.getHistory());
		expect(store.dispatch).toHaveBeenCalledWith('search_services/research_history', {
			page: 1,
			limit: 1
		});
	});
});
