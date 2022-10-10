import ForgotPassword from '../../../src/views/auth/ForgotPassword';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

const localVue = createLocalVue();

localVue.use(Vuex);

let statusRes = {
	status: 200,
	statusText: 'OK',
	data: {
		message: 'success'
	}
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
jest.useFakeTimers();

describe('ForgotPassword', () => {
	let store;
	const router = new VueRouter({ routes: [{ path: '/check-inbox', name: 'CheckInbox' }] });

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
						forgotPassword: jest.fn().mockResolvedValue(statusRes)
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
		const wrapper = shallowMount(ForgotPassword, {
			store,
			router,
			localVue
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('tests that the forgotPassword action is called', async () => {
		const wrapper = mount(ForgotPassword, {
			store,
			localVue,
			mocks: {
				$router: {
					push: jest.fn()
				},
				$route: {
					name: 'CheckInbox'
				}
			},
			data() {
				return {
					email: 'lani@enyata.com'
				};
			}
		});
		let form = wrapper.find('form');
		form.trigger('submit');
		await wrapper.vm.$nextTick();

		expect(store.dispatch).toHaveBeenCalledWith('auth/forgotPassword', {
			email: 'lani@enyata.com'
		});

		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.name).toBe('CheckInbox');
	});

	it('tests that the error alert is triggered', async () => {
		store.dispatch = jest.fn().mockRejectedValue(errRes);

		const wrapper = mount(ForgotPassword, {
			store,
			localVue,
			mocks: {
				$router: {
					push: jest.fn()
				},
				$route: {
					name: 'CheckInbox'
				}
			},
			data() {
				return {
					email: 'lan@enyata.com'
				};
			}
		});

		let form = wrapper.find('form');
		form.trigger('submit');
		await wrapper.vm.$nextTick();

		expect(store.dispatch).toHaveBeenCalledWith('auth/forgotPassword', {
			email: 'lan@enyata.com'
		});
	});
});
