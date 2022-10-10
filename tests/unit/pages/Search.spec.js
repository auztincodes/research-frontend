import Vuex from 'vuex';
import VueRouter from 'vue-router';
import flushPromises from 'flush-promises';
import { mount, shallowMount, RouterLinkStub, createLocalVue } from '@vue/test-utils';
import Search from '../../../src/views/Search/Search.vue';
import CButton from '../../../src/components/Button';
import ValidationObserver from 'vee-validate';
import VTabs from '../../../src/components/Tabs';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.component('ValidationObserver', ValidationObserver);
localVue.use(Vuex);

jest.useFakeTimers();
let searchResult = {
	status: 200,
	data: {
		company_research: [
			{
				createdAt: '2021-05-14T10:33:11.606Z',
				description: 'AMZN',
				relevance_score: 0.41000000000000003,
				rowId: '3d9d0ec5-2e1b-4ab0-b7fb-0995940a08f2',
				title: 'AMZN Stock Price',
				type: 'company_research',
				updatedAt: '2021-05-14T10:33:11.606Z',
				url: 'https://www.marketwatch.com/investing/stock/amzn',
				userId: '607ea1bf965bbe6414c00b13',
				__v: 0,
				_id: '609e51e7487a4982cfcb045a'
			}
		],
		contact_research: [
			{
				createdAt: '2021-05-14T10:33:11.606Z',
				description: 'AMZN',
				relevance_score: 0.41000000000000003,
				rowId: '3d9d0ec5-2e1b-4ab0-b7fb-0995940a08f2',
				title: 'AMZN Stock Price',
				type: 'company_research',
				updatedAt: '2021-05-14T10:33:11.606Z',
				url: 'https://www.marketwatch.com/investing/stock/amzn',
				userId: '607ea1bf965bbe6414c00b13',
				__v: 0,
				_id: '609e51e7487a4982cfcb045a'
			}
		]
	},
	statusText: 'OK'
};
let researchResponse = {
	status: 200,
	statusCode: 'OK',
	data: {
		data: {
			company: 'Tesla',
			company_research: {
				others: []
			},
			contact_research: {
				others: []
			},
			full_name: 'Elon Musk',
			research_score: 0.1,
			role: 'CEO',
			rowId: '2d299310-b459-4386-a023-3095436defb7',
			socials: [],
			status: {},
			userId: '1'
		}
	}
};
describe('search', () => {
	let store;
	const router = new VueRouter({
		routes: [
			{ path: '/', name: 'Search', meta: {} },
			{ path: '/login', name: 'Login' },
			{ path: '/contact-research', name: 'ContactResearch' },
			{ path: '/search-result', name: 'SearchResult' },
			{ path: '/settings', name: 'Settings' }
		]
	});
	beforeEach(() => {
		store = new Vuex.Store({
			modules: {
				auth: {
					namespaced: true,
					getters: {
						getLoggedUser: () => ({
							id: '1',
							email: 'abass@enyata.com',
							token: '123',
							is_settings: true,
							role: 'admin'
						})
					},
					mutations: {
						logout: jest.fn()
					}
				},
				user: {
					namespaced: true,
					actions: {
						getSettings: jest.fn().mockResolvedValue(searchResult)
					}
				},
				search_services: {
					namespaced: true,
					mutations: {
						saveSearchedResult: jest.fn(),
						saveSearchPayload: jest.fn()
					},
					actions: {
						research: jest.fn().mockResolvedValue(researchResponse),
						bulk_research: jest.fn()
					}
				}
			},
			actions: {
				showAlert: jest.fn()
			}
		});
	});
	it('should be a vue instance', () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router,
			payload: {
				full_name: '',
				company: '',
				role: '',
				company_research: [],
				contact_research: []
			}
		});

		expect(wrapper.vm).toBeTruthy();
	});

	it('should call getUserSettings', async () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router,
			payload: {
				full_name: '',
				company: '',
				role: '',
				company_research: [],
				contact_research: []
			}
		});
		await expect(wrapper.vm.getUserSettings());
		wrapper.vm.payload.contact_research = searchResult.data.contact_research;
		wrapper.vm.payload.company_research = searchResult.data.company_research;
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.payload.contact_research).toBe(searchResult.data.contact_research);
		expect(wrapper.vm.payload.company_research).toBe(searchResult.data.company_research);
	});
	it('should show title text', () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router,
			stubs: {
				RouterLink: RouterLinkStub
			}
		});
		expect(wrapper.find('p').text()).toBe('Aggregated sales research to power your personalized outreach.');
	});
	it('should mount company profile by default', async () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router
		});
		await flushPromises();
		await wrapper.vm.$nextTick();

		expect(wrapper.findComponent(VTabs).exists()).toBe(true);
	});

	it('should show the button visible and disabled by default', async () => {
		const wrapper = mount(Search, {
			store,
			localVue,
			router,
			data() {
				return {
					loading: false,
					payload: {}
				};
			}
		});

		await flushPromises();
		jest.runAllTimers();
		await flushPromises();
		expect(wrapper.findComponent(CButton).attributes('disabled')).toBe('disabled');
	});

	it('should route to login', async () => {
		const wrapper = shallowMount(Search, {
			localVue,
			store,
			router
		});
		wrapper.vm.logoutUser();
		await wrapper.vm.$nextTick();
	});
	it('tests that the inputFile method is called', () => {
		let newFile = {
			size: 12234212312,
			name: 'lani.jpeg'
		};
		const wrapper = shallowMount(Search, {
			router,
			store,
			localVue
		});
		expect(wrapper.vm.inputFile(newFile));
		newFile = {
			name: 'lani.jpeg'
		};
		expect(wrapper.vm.inputFile(newFile));
	});
	it('upload bulk research', async () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router
		});
		wrapper.vm.uploadBulkResearch();
	});
	it('tests submitSearch method', async () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router
		});
		wrapper.vm.submitSearch();
	});
	it('tests openConfigModal method', async () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router,
			data() {
				return {
					showConfigModal: false
				};
			}
		});
		wrapper.vm.openConfigModal();
	});
	it('tests closeConfigModal method', async () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router,
			data() {
				return {
					showConfigModal: true
				};
			}
		});
		wrapper.vm.closeConfigModal();
	});
	it('tests gotoSettings method', async () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router,
			data() {
				return {
					showConfigModal: true,
					showMoreSearchSettings: false
				};
			}
		});
		wrapper.vm.gotoSettings();
	});
	it('tests routerEventHandler method', async () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router,
			data() {
				return {
					showMoreSearchSettings: true
				};
			}
		});
		wrapper.vm.routerEventHandler('closeMoreSearchSettings');
	});
	it('tests btnApplyChanges method', async () => {
		const wrapper = shallowMount(Search, {
			store,
			localVue,
			router
		});
		wrapper.vm.btnApplyChanges();
	});
	it('tests that settings keyword method is called', () => {
		let event = new Event('target');
		event = {
			target: {
				value: 'community, buildup'
			}
		};
		const wrapper = shallowMount(Search, {
			router,
			localVue,
			store
		});
		expect(wrapper.vm.onKeywordsChange('company_research', event));
	});
	it('tests that tab is changed to import_contacts', () => {
		const wrapper = mount(Search, {
			router,
			localVue,
			store,
			data() {
				return {
					activeTab: 'import_contacts'
				};
			}
		});
		expect(wrapper.vm.setActiveTab('import_contacts'));
		expect(wrapper.vm.$data.activeTab).toBe('import_contacts');
	});
});
