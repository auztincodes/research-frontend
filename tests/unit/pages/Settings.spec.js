import Settings from '../../../src/views/Settings/Settings.vue';
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VButton from '../../../src/components/Button';

jest.useFakeTimers();
const localVue = createLocalVue();

localVue.use(Vuex);

let statusRes = {
	status: 200,
	statusText: 'OK',
	data: {
		data: {
			email: 'aileen.rioux@volley.com',
			first_name: 'Aileen',
			is_settings: true,
			last_name: 'Rioux',
			last_research_date: { _id: '60cc929ee16df22ed1eaa553', updatedAt: '2021-06-18T13:54:00.521Z' },
			monthly_research: 400,
			next_payment_date: '2021-07-18T13:27:04.675Z',
			organisation: 'Volley',
			profession: 'BDR',
			remaining_monthly_research: 399,
			researches_performed: 5,
			role: 'user',
			status: 'active',
			updatedAt: '2021-06-28T15:47:16.013Z',
			_id: '1',
			company_research: ['hello'],
			contact_research: ['hello']
		}
	}
};

let settingRes = {
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

describe('Settings', () => {
	let store;

	beforeEach(() => {
		store = new Vuex.Store({
			actions: {
				showAlert: jest.fn()
			},
			getters: {},
			mutations: {},
			modules: {
				user: {
					actions: {
						settings: jest.fn().mockResolvedValue(settingRes)
						// getSettings: jest.fn().mockResolvedValue(statusRes)
					},
					getters: {},
					mutations: {},
					namespaced: true
				},
				search_services: {
					namespaced: true,
					actions: {
						research: jest.fn().mockResolvedValue(statusRes)
					}
				}
			}
		});
		store.dispatch = jest.fn().mockResolvedValue(statusRes);
	});

	it('tests that the page mounts', () => {
		const wrapper = shallowMount(Settings, {
			store,
			localVue
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('tests that settings keyword method is called', () => {
		let event = new Event('target');
		event = {
			target: {
				value: 'community, buildup'
			}
		};
		const wrapper = shallowMount(Settings, {
			localVue,
			store
		});
		expect(wrapper.vm.onKeywordsChange('company_research', event));
	});

	it('tests that toggleModal method is called', () => {
		const wrapper = shallowMount(Settings, {
			store,
			localVue
		});
		expect(wrapper.vm.toggleModal());
	});

	it('tests that modal toggles', () => {
		const wrapper = shallowMount(Settings, {
			store,
			localVue,
			data() {
				return {
					showModal: true
				};
			}
		});
		expect(wrapper.vm.toggleClass).toBe(true);
		wrapper.vm.$nextTick();
		wrapper.vm.toggleModal();
		expect(wrapper.vm.toggleClass).toBe(false);
		jest.advanceTimersByTime(500);
		wrapper.vm.$nextTick();
		expect(wrapper.vm.toggleClass).toBe(true);
	});

	it('tests that the submitForm button is clicked', async () => {
		const wrapper = mount(Settings, {
			store,
			localVue,
			data() {
				return {
					settings: {
						company_research: ['hello'],
						contact_research: ['hello']
					}
				};
			}
		});
		const btn = wrapper.find({ ref: 'settingsBtn' });
		btn.trigger('click');

		expect(store.dispatch).toHaveBeenCalledWith('user/settings', {
			company_research: ['hello'],
			contact_research: ['hello']
		});
	});

	it('tests that the error alert is triggered', async () => {
		store.dispatch = jest.fn().mockRejectedValue(errRes);

		const wrapper = mount(Settings, {
			store,
			localVue,
			data() {
				return {
					settings: {
						company_research: ['hello'],
						contact_research: ['hello']
					}
				};
			}
		});
		const btn = wrapper.find({ ref: 'settingsBtn' });
		btn.trigger('click');

		await expect(store.dispatch).toHaveBeenCalledWith('user/settings', {
			company_research: ['hello'],
			contact_research: ['hello']
		});
	});

	it('tests that the settings page is closed', () => {
		const wrapper = mount(Settings, {
			store,
			localVue,
			data() {
				return {
					initialKeywords: ['hello'],
					initialCompanyKeywords: ['hello'],
					settings: {
						company_research: ['hello'],
						contact_research: ['hello']
					}
				};
			}
		});
		const btn = wrapper.findComponent(VButton);
		btn.trigger('click');

		expect(wrapper.vm.$data.initialKeywords).toStrictEqual(wrapper.vm.$data.settings.contact_research);
	});

	it('tests that the settings page modal is opened', () => {
		const toggleModal = jest.fn();

		const wrapper = mount(Settings, {
			store,
			localVue,
			data() {
				return {
					initialKeywords: ['hello'],
					initialCompanyKeywords: ['hello'],
					settings: {
						company_research: ['hi'],
						contact_research: ['hi']
					}
				};
			},
			methods: {
				toggleModal
			}
		});
		const btn = wrapper.findComponent(VButton);
		btn.trigger('click');

		expect(wrapper.vm.$data.initialCompanyKeywords).not.toStrictEqual(wrapper.vm.$data.settings.company_research);
		expect(toggleModal).toHaveBeenCalled();
	});
});
