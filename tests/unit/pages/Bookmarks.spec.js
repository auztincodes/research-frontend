import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Bookmarks from '../../../src/views/Bookmarks/Bookmarks.vue';
import VueRouter from 'vue-router';
import flushPromises from 'flush-promises';
const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

jest.mock('axios', () => ({
	get: Promise.resolve(true)
}));

let bookmarks = {
	status: 200,
	data: {
		response: {
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
		}
	},
	statusText: 'OK'
};
describe('Bookmarks.vue', () => {
	let store;
	const router = new VueRouter({ routes: [{ path: '/bookmarks', name: 'Bookmarks', query: { rowId: '1' } }] });
	const searchRoute = new VueRouter({ routes: [{ path: '/insight-item', name: 'InsightItem' }] });
	beforeEach(() => {
		store = new Vuex.Store({
			actions: {
				showAlert: jest.fn()
			},
			modules: {
				search_services: {
					namespaced: true,
					mutations: {
						saveSearchedResult: jest.fn(),
						saveSearchedItem: jest.fn()
					},
					getters: {
						getSearchedResult: () => ({
							research_score: 0.6954999999999999,
							socials: [{ twitter: {} }],
							_id: '1',
							company: 'Volley',
							email: 'dayo@enyata.com',
							full_name: 'Ian Carnevale',
							linkedin: 'https://www.linkedin.com/in/oladayo',
							role: 'CEO',
							url: 'https://enyata.com',
							rowId: '1',
							batchId: '1',
							userId: '60992e95baa22116bb37d258',
							status: { statusCode: 'READY', message: 'Ready' },
							__v: 0,
							createdAt: '2021-04-22T20:17:50.272Z',
							updatedAt: '2021-06-21T14:21:40.293Z',
							company_research: {
								others: [
									{
										title: 'Volley: Home',
										url: 'https://volleythat.com/',
										description: 'Volley',
										tags: ['website'],
										dontRender: null,
										meta: {
											timestamp: '2021-06-21T14:21:35.384Z',
											published: null,
											resourceType: 'website',
											host: 'volleythat.com',
											html: {
												snippet: '<b>Volley</b>',
												title: '<b>Volley</b>: Home',
												url: 'https://<b>volley</b>that.com/'
											},
											content: { html: '<div></div>', tag: ['San Francisco'], date: null },
											relevanceScore: 0.6954999999999999
										},
										content: null,
										is_bookmarked: false
									}
								]
							},
							contact_research: {
								others: [
									{
										title: 'Volley: Home',
										url: 'https://volleythat.com/',
										description: 'Volley',
										tags: ['website'],
										dontRender: null,
										meta: {
											timestamp: '2021-06-21T14:21:35.384Z',
											published: null,
											resourceType: 'website',
											host: 'volleythat.com',
											html: {
												snippet: '<b>Volley</b>',
												title: '<b>Volley</b>: Home',
												url: 'https://<b>volley</b>that.com/'
											},
											content: { html: '<div></div>', tag: ['San Francisco'], date: null },
											relevanceScore: 0.6954999999999999
										},
										content: null,
										is_bookmarked: false
									}
								]
							}
						})
					}
				},
				user: {
					namespaced: true,
					mutations: {},
					getters: {},
					actions: {
						getBookmarks: jest.fn().mockResolvedValue(bookmarks),
						removeFromBookmarks: jest.fn()
					}
				}
			}
		});
	});

	it('Render without errors', () => {
		const wrapper = shallowMount(Bookmarks, {
			store,
			localVue,
			router
		});
		expect(wrapper.vm).toBeTruthy();
	});

	it('calls displaySearchItem method', () => {
		const wrapper = shallowMount(Bookmarks, {
			store,
			localVue,
			router: searchRoute
		});
		expect(wrapper.vm.displaySearchItem());
	});
	it('calls initUserBookmarks method', () => {
		const wrapper = shallowMount(Bookmarks, {
			store,
			localVue,
			router
		});
		expect(wrapper.vm.initUserBookmarks());
	});

	it('should return list of bookmarks', async () => {
		const wrapper = shallowMount(Bookmarks, {
			store,
			localVue,
			router,
			data() {
				return {
					loadMore: false,
					bookmarkLoading: true,
					userBookmarks: bookmarks.data.response
				};
			}
		});
		expect(wrapper.vm.userBookmarks).toEqual(bookmarks.data.response);
	});

	it('calls btnRemoveFromBookMarks method', () => {
		const wrapper = shallowMount(Bookmarks, {
			store,
			localVue,
			router
		});
		expect(wrapper.vm.btnRemoveFromBookMarks(bookmarks.data.response));
	});
	it('should return contactResearch', async () => {
		const wrapper = shallowMount(Bookmarks, {
			store,
			localVue,
			router
		});
		await flushPromises();
		expect(wrapper.vm.contactResearch).toStrictEqual({ ...bookmarks.data.response.contact_research });
	});
	it('should return companyResearch', async () => {
		const wrapper = shallowMount(Bookmarks, {
			store,
			localVue,
			router
		});
		await flushPromises();
		expect(wrapper.vm.companyResearch).toStrictEqual({ ...bookmarks.data.response.company_research });
	});
	it('returns screen type for large screen', async () => {
		const wrapper = shallowMount(Bookmarks, {
			store,
			localVue,
			router,
			data() {
				return {
					screenWidth: 797
				};
			}
		});
		expect(wrapper.vm.screenType).toBe('large');
	});
	it('returns screen type for small screen', async () => {
		const wrapper = shallowMount(Bookmarks, {
			store,
			localVue,
			router,
			data() {
				return {
					screenWidth: 795
				};
			}
		});
		expect(wrapper.vm.screenType).toBe('small');
	});
});
