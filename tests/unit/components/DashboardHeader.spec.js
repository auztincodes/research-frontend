import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import DashboardHeader from '../../../src/components/DashboardHeader';
import VueRouter from 'vue-router';
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('DashboardHeader', () => {
	let mutations;
	let store;
	const router = new VueRouter({ routes: [{ path: '/login', name: 'Login' }] });
	beforeEach(() => {
		mutations = {
			logout: jest.fn()
		};
		store = new Vuex.Store({
			modules: {
				auth: {
					namespaced: true,
					mutations,
					getters: {
						getLoggedUser: () => ({
							id: '1',
							email: 'abass@enyata.com',
							token: '123',
							is_settings: true,
							role: 'admin'
						})
					}
				}
			}
		});
	});

	it('should be a vue instance', () => {
		const wrapper = shallowMount(DashboardHeader, {
			localVue,
			store,
			router
		});

		expect(wrapper.vm).toBeTruthy();
	});

	it('should route to login', async () => {
		const wrapper = shallowMount(DashboardHeader, {
			localVue,
			store,
			router
		});
		wrapper.vm.logoutUser();
		await wrapper.vm.$nextTick();
	});
});
